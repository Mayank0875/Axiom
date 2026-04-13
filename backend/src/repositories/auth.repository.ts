/**
 * repositories/auth.repository.ts — Auth Data Access
 *
 * LAYER: Repository (data access layer — SQL only)
 *
 * WHAT IT DOES:
 *   All database operations needed for authentication:
 *   creating users, finding by email, assigning default role, loading roles.
 *
 * DESIGN PATTERN: Repository Pattern
 *   This class is the ONLY place that writes SQL for auth operations.
 *   AuthService calls these methods — it never writes SQL itself.
 *   This separation means you can swap PostgreSQL for another DB
 *   by only changing this file.
 *
 * WHY SEPARATE FROM UserRepository:
 *   AuthRepository handles auth-specific queries (login, register, roles).
 *   UserRepository handles admin/profile queries (list users, update profile).
 *   Separating them follows Single Responsibility Principle.
 *
 * SECURITY NOTE:
 *   findByEmail returns password_hash — this is intentional for login comparison.
 *   The hash is NEVER returned to the client (AuthService strips it before responding).
 *
 * CONNECTS TO:
 *   - config/database.ts    (db.query for all SQL)
 *   - models/user.model.ts  (UserRole type)
 *   - services/auth.service.ts (only caller)
 */

import { db } from "../config/database";
import { UserRole } from "../models/user.model";

// Internal type — includes password_hash for login comparison
// This type is NOT exposed outside this file
type UserWithPassword = {
  id: number;
  university_id: number;
  full_name: string;
  email: string;
  password_hash: string;
};

export class AuthRepository {

  /** Insert a new user row and return the created record (without password_hash) */
  public async createUser(input: {
    universityId: number;
    fullName: string;
    email: string;
    passwordHash: string;
  }) {
    const result = await db.query(
      `INSERT INTO users (university_id, full_name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, university_id, full_name, email`,
      [input.universityId, input.fullName, input.email, input.passwordHash]
    );
    return result.rows[0];
  }

  /**
   * Find a user by email — returns password_hash for bcrypt comparison.
   * Returns null if not found (caller handles the 401).
   */
  public async findByEmail(email: string): Promise<UserWithPassword | null> {
    const result = await db.query<UserWithPassword>(
      `SELECT id, university_id, full_name, email, password_hash
       FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );
    return result.rows[0] ?? null;
  }

  /**
   * Assign the "student" role to a newly registered user.
   * ON CONFLICT DO NOTHING — safe to call multiple times.
   */
  public async assignDefaultStudentRole(userId: number) {
    await db.query(
      `INSERT INTO user_roles (user_id, role_id)
       SELECT $1, id FROM roles WHERE name = 'student'::role_enum
       ON CONFLICT (user_id, role_id) DO NOTHING`,
      [userId]
    );
  }

  /** Load all roles for a user — used to build the JWT payload after login/register */
  public async getUserRoles(userId: number): Promise<UserRole[]> {
    const result = await db.query<{ name: UserRole }>(
      `SELECT r.name FROM user_roles ur
       JOIN roles r ON r.id = ur.role_id
       WHERE ur.user_id = $1`,
      [userId]
    );
    return result.rows.map((row) => row.name);
  }
}
