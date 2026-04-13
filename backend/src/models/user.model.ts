/**
 * models/user.model.ts — User Domain Model
 *
 * WHAT IT DOES:
 *   Defines the User class and UserRole type used throughout the application.
 *
 * DESIGN PATTERN: Domain Model
 *   A plain TypeScript class that represents a user entity.
 *   It is NOT an ORM model — it doesn't auto-sync with the database.
 *   Services create `new User(...)` instances before passing them to repositories.
 *
 * WHY A CLASS (not just an interface):
 *   Using a class lets us instantiate objects with `new User(...)`.
 *   This makes the creation intent explicit in service code.
 *
 * ROLES:
 *   - admin   → manages university, users, and has full visibility
 *   - faculty → creates courses, assignments, quizzes
 *   - student → enrolls in courses, submits work, attempts quizzes
 *
 * CONNECTS TO:
 *   - repositories/user.repository.ts (creates User instances for DB insert)
 *   - services/user.service.ts (validates and builds User before saving)
 *   - middlewares/auth.middleware.ts (UserRole used in req.user)
 *   - middlewares/role.middleware.ts (UserRole used for access control)
 */

/** The three roles in the Axiom LMS system */
export type UserRole = "admin" | "faculty" | "student";

/** Represents a user in the system — maps to the `users` table */
export class User {
  constructor(
    public readonly id: number | null,       // null before insert, set by DB after
    public readonly universityId: number,    // which university this user belongs to
    public readonly fullName: string,
    public readonly email: string,
    public readonly passwordHash: string     // bcrypt hash — never plain text
  ) {}
}
