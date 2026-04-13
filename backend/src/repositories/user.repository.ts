import { db } from "../config/database";
import { User, UserRole } from "../models/user.model";

export class UserRepository {
  public async listUsers() {
    const result = await db.query(`
      SELECT id, university_id, full_name, email, is_active, is_verified, created_at
      FROM users ORDER BY id DESC
    `);
    return result.rows;
  }

  public async create(user: User) {
    const result = await db.query<User>(
      `INSERT INTO users (university_id, full_name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, university_id, full_name, email, password_hash`,
      [user.universityId, user.fullName, user.email, user.passwordHash]
    );
    return result.rows[0];
  }

  public async assignRole(userId: number, role: UserRole) {
    const result = await db.query(
      `INSERT INTO user_roles (user_id, role_id)
       SELECT $1, id FROM roles WHERE name = $2::role_enum
       ON CONFLICT (user_id, role_id) DO NOTHING
       RETURNING id, user_id, role_id`,
      [userId, role]
    );
    return result.rows[0] ?? null;
  }

  /** Full profile — university, roles (as real JSON array), student/faculty profile */
  public async findProfileById(userId: number) {
    const result = await db.query(
      `SELECT
         u.id,
         u.full_name,
         u.email,
         u.phone,
         u.is_active,
         u.is_verified,
         u.created_at,
         u.last_login_at,
         uni.id          AS university_id,
         uni.name        AS university_name,
         uni.website_url AS university_website,
         -- json_agg so pg driver returns a real JS array, not a pg array string
         COALESCE(
           (SELECT json_agg(r.name ORDER BY r.name)
            FROM user_roles ur JOIN roles r ON r.id = ur.role_id
            WHERE ur.user_id = u.id),
           '[]'::json
         ) AS roles,
         sp.roll_number,
         sp.year        AS study_year,
         sp.department,
         sp.cgpa,
         fp.designation,
         fp.specialization,
         fp.experience_years
       FROM users u
       JOIN universities uni ON uni.id = u.university_id
       LEFT JOIN student_profiles sp ON sp.user_id = u.id
       LEFT JOIN faculty_profiles fp ON fp.user_id = u.id
       WHERE u.id = $1`,
      [userId]
    );

    if (!result.rows[0]) return null;
    const row = result.rows[0];

    // Safely fetch program & batch (tables may not exist in all envs)
    let programData = {
      program_id: null as null | number,
      program_title: null as null | string,
      program_description: null as null | string,
    };
    let batchData = {
      batch_id: null as null | number,
      batch_title: null as null | string,
      batch_status: null as null | string,
      batch_start_date: null as null | string,
      batch_end_date: null as null | string,
    };

    try {
      const prog = await db.query(
        `SELECT id AS program_id, title AS program_title, description AS program_description
         FROM programs WHERE university_id = $1 ORDER BY id LIMIT 1`,
        [row.university_id]
      );
      if (prog.rows[0]) programData = prog.rows[0] as typeof programData;
    } catch { /* programs table may not exist yet */ }

    try {
      const batch = await db.query(
        `SELECT id AS batch_id, title AS batch_title, status AS batch_status,
                start_date AS batch_start_date, end_date AS batch_end_date
         FROM batches WHERE university_id = $1 ORDER BY start_date DESC LIMIT 1`,
        [row.university_id]
      );
      if (batch.rows[0]) batchData = batch.rows[0] as typeof batchData;
    } catch { /* batches table may not exist yet */ }

    return { ...row, ...programData, ...batchData };
  }

  /** Update core user fields — builds parameterized query safely */
  public async updateProfile(
    userId: number,
    fields: { fullName?: string; email?: string; phone?: string }
  ) {
    const sets: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (fields.fullName !== undefined) { sets.push("full_name = $" + idx++); values.push(fields.fullName); }
    if (fields.email    !== undefined) { sets.push("email = $"     + idx++); values.push(fields.email.toLowerCase()); }
    if (fields.phone    !== undefined) { sets.push("phone = $"     + idx++); values.push(fields.phone || null); }

    if (!sets.length) return null;

    sets.push("updated_at = NOW()");
    values.push(userId);

    const result = await db.query(
      `UPDATE users SET ${sets.join(", ")} WHERE id = $${idx} RETURNING id, full_name, email, phone, updated_at`,
      values
    );
    return result.rows[0] ?? null;
  }

  /** Upsert student profile */
  public async upsertStudentProfile(
    userId: number,
    fields: { rollNumber?: string; department?: string; year?: number; cgpa?: number }
  ) {
    const result = await db.query(
      `INSERT INTO student_profiles (user_id, roll_number, department, year, cgpa)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id) DO UPDATE SET
         roll_number = COALESCE(EXCLUDED.roll_number, student_profiles.roll_number),
         department  = COALESCE(EXCLUDED.department,  student_profiles.department),
         year        = COALESCE(EXCLUDED.year,         student_profiles.year),
         cgpa        = COALESCE(EXCLUDED.cgpa,         student_profiles.cgpa)
       RETURNING *`,
      [userId, fields.rollNumber ?? null, fields.department ?? null, fields.year ?? null, fields.cgpa ?? null]
    );
    return result.rows[0] ?? null;
  }

  /** Check email uniqueness for update (exclude current user) */
  public async emailTakenByOther(email: string, universityId: number, excludeUserId: number): Promise<boolean> {
    const result = await db.query(
      `SELECT 1 FROM users WHERE email = $1 AND university_id = $2 AND id != $3 LIMIT 1`,
      [email.toLowerCase(), universityId, excludeUserId]
    );
    return (result.rowCount ?? 0) > 0;
  }
}
