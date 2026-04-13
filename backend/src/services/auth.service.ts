/**
 * services/auth.service.ts — Authentication Business Logic
 *
 * WHAT IT DOES:
 *   Handles user registration and login. Validates input, hashes passwords,
 *   assigns default roles, and generates JWT tokens.
 *
 * DESIGN PATTERN: Service Layer
 *   All business rules live here — not in the controller (which only handles HTTP)
 *   and not in the repository (which only handles SQL).
 *
 * DEPENDENCY INJECTION:
 *   AuthRepository is injected via constructor. This makes the service testable —
 *   you can pass a mock repository in tests without touching the database.
 *
 * REGISTER FLOW:
 *   1. Validate email format and password length
 *   2. Check if email already exists (409 if so)
 *   3. Hash the password with bcrypt
 *   4. Insert user into DB
 *   5. Assign default "student" role
 *   6. Generate JWT with { userId, roles }
 *   7. Return token + user info
 *
 * LOGIN FLOW:
 *   1. Find user by email
 *   2. Compare password with stored bcrypt hash
 *   3. Load user's roles from DB
 *   4. Generate JWT
 *   5. Return token + user info + roles
 *
 * CONNECTS TO:
 *   - repositories/auth.repository.ts (DB operations)
 *   - utils/hash.ts (hashPassword, comparePassword)
 *   - utils/jwt.ts (generateToken)
 *   - utils/httpError.ts (throws on validation failure)
 *   - controllers/auth.controller.ts (called by register/login handlers)
 */

import { AuthRepository } from "../repositories/auth.repository";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { HttpError } from "../utils/httpError";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async registerUser(input: {
    universityId: number;
    fullName: string;
    email: string;
    password: string;
  }) {
    // Validate inputs before touching the database
    if (!input.email.includes("@")) {
      throw new HttpError(400, "Please provide a valid email.");
    }
    if (input.password.length < 6) {
      throw new HttpError(400, "Password must be at least 6 characters.");
    }

    // Prevent duplicate accounts
    const existing = await this.authRepository.findByEmail(input.email.toLowerCase());
    if (existing) {
      throw new HttpError(409, "Email is already registered.");
    }

    // Never store plain text — hash before saving
    const passwordHash = await hashPassword(input.password);
    const user = await this.authRepository.createUser({
      universityId: input.universityId,
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      passwordHash,
    });

    // New users always start as students
    await this.authRepository.assignDefaultStudentRole(user.id);
    const roles = await this.authRepository.getUserRoles(user.id);

    // pg returns bigint as string — coerce to number for JWT
    const token = generateToken({ userId: Number(user.id), roles });
    return { token, user: { ...user, id: Number(user.id) }, roles };
  }

  public async loginUser(input: { email: string; password: string }) {
    const user = await this.authRepository.findByEmail(input.email.toLowerCase());
    if (!user) {
      // Same message for both "not found" and "wrong password" — prevents user enumeration
      throw new HttpError(401, "Invalid email or password.");
    }

    const isPasswordCorrect = await comparePassword(input.password, user.password_hash);
    if (!isPasswordCorrect) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const roles = await this.authRepository.getUserRoles(user.id);
    const token = generateToken({ userId: Number(user.id), roles });

    return {
      token,
      user: {
        id: Number(user.id),
        university_id: Number(user.university_id),
        full_name: user.full_name,
        email: user.email,
      },
      roles,
    };
  }
}
