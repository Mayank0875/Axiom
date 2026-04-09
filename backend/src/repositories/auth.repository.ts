import { db } from "../config/database";
import { UserRole } from "../models/user.model";

type UserWithPassword = {
  id: number;
  university_id: number;
  full_name: string;
  email: string;
  password_hash: string;
};

export class AuthRepository {
  public async createUser(input: {
    universityId: number;
    fullName: string;
    email: string;
    passwordHash: string;
  }) {
    const query = `
      INSERT INTO users (university_id, full_name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, university_id, full_name, email
    `;
    const result = await db.query(query, [
      input.universityId,
      input.fullName,
      input.email,
      input.passwordHash,
    ]);
    return result.rows[0];
  }

  public async findByEmail(email: string) {
    const query = `
      SELECT id, university_id, full_name, email, password_hash
      FROM users
      WHERE email = $1
      LIMIT 1
    `;
    const result = await db.query<UserWithPassword>(query, [email]);
    return result.rows[0] ?? null;
  }

  public async assignDefaultStudentRole(userId: number) {
    const query = `
      INSERT INTO user_roles (user_id, role_id)
      SELECT $1, id FROM roles WHERE name = 'student'::role_enum
      ON CONFLICT (user_id, role_id) DO NOTHING
    `;
    await db.query(query, [userId]);
  }

  public async getUserRoles(userId: number) {
    const query = `
      SELECT r.name
      FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = $1
    `;
    const result = await db.query<{ name: UserRole }>(query, [userId]);
    return result.rows.map((row) => row.name);
  }
}

