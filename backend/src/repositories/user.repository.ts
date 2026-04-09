import { db } from "../config/database";
import { User, UserRole } from "../models/user.model";

export class UserRepository {
  public async listUsers() {
    const query = `
      SELECT id, university_id, full_name, email, is_active, is_verified, created_at
      FROM users
      ORDER BY id DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  public async create(user: User) {
    const query = `
      INSERT INTO users (university_id, full_name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, university_id, full_name, email, password_hash
    `;

    const result = await db.query<User>(query, [
      user.universityId,
      user.fullName,
      user.email,
      user.passwordHash,
    ]);

    return result.rows[0];
  }

  public async assignRole(userId: number, role: UserRole) {
    const query = `
      INSERT INTO user_roles (user_id, role_id)
      SELECT $1, id FROM roles WHERE name = $2::role_enum
      ON CONFLICT (user_id, role_id) DO NOTHING
      RETURNING id, user_id, role_id
    `;

    const result = await db.query(query, [userId, role]);
    return result.rows[0] ?? null;
  }
}

