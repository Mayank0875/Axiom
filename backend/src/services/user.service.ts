/**
 * services/user.service.ts — User Business Logic
 *
 * LAYER: Service (business logic layer)
 *
 * WHAT IT DOES:
 *   Handles all user-related business operations:
 *   listing users, creating users, assigning roles, and managing profiles.
 *
 * DESIGN PATTERN: Service Layer
 *   All validation and business rules live here.
 *   The controller just passes req.body — this service decides what's valid.
 *
 * DEPENDENCY INJECTION:
 *   UserRepository is injected via constructor.
 *   This service never writes SQL — it only calls repository methods.
 *
 * KEY OPERATIONS:
 *   - listUsers()        → admin sees all users
 *   - createUser()       → validates email, builds User model, saves
 *   - assignRole()       → adds a role to a user (admin action)
 *   - getMyProfile()     → full profile with university, roles, academic data
 *   - updateMyProfile()  → partial update of user + student profile fields
 *
 * PROFILE UPDATE LOGIC:
 *   1. Validate email format if provided
 *   2. Check email uniqueness (can't steal another user's email)
 *   3. Update core user fields (name, email, phone)
 *   4. If academic fields provided, upsert student_profiles row
 *   5. Return fresh profile from DB
 *
 * CONNECTS TO:
 *   - repositories/user.repository.ts  (all DB operations)
 *   - models/user.model.ts             (User class, UserRole type)
 *   - utils/httpError.ts               (throws on validation failure)
 *   - controllers/user.controller.ts   (called by all user handlers)
 */

import { User, UserRole } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { HttpError } from "../utils/httpError";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /** Returns all users — admin-only operation */
  public async listUsers() {
    return this.userRepository.listUsers();
  }

  /** Validate email, build User model, persist to DB */
  public async createUser(input: {
    universityId: number;
    fullName: string;
    email: string;
    passwordHash: string;
  }) {
    if (!input.email.includes("@")) {
      throw new HttpError(400, "Please provide a valid email.");
    }
    // Build domain object — repository receives a typed User, not raw data
    const user = new User(null, input.universityId, input.fullName, input.email.toLowerCase(), input.passwordHash);
    return this.userRepository.create(user);
  }

  /** Assign a role to a user — throws if role already assigned */
  public async assignRole(userId: number, role: UserRole) {
    const assignedRole = await this.userRepository.assignRole(userId, role);
    if (!assignedRole) {
      throw new HttpError(404, "Role not found or role already assigned.");
    }
    return assignedRole;
  }

  /** Get full profile: university, roles array, student/faculty profile, program, batch */
  public async getMyProfile(userId: number) {
    const profile = await this.userRepository.findProfileById(userId);
    if (!profile) throw new HttpError(404, "User not found.");
    return profile;
  }

  /**
   * Partial update — only updates fields that are provided.
   * Handles both core user fields and student academic profile.
   */
  public async updateMyProfile(
    userId: number,
    universityId: number,
    input: {
      fullName?: string;
      email?: string;
      phone?: string;
      rollNumber?: string;
      department?: string;
      year?: number;
      cgpa?: number;
    }
  ) {
    // Validate new email if provided
    if (input.email) {
      if (!input.email.includes("@")) throw new HttpError(400, "Invalid email.");
      const taken = await this.userRepository.emailTakenByOther(input.email, universityId, userId);
      if (taken) throw new HttpError(409, "Email already in use.");
    }

    // Update core user table fields
    await this.userRepository.updateProfile(userId, {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
    });

    // Upsert student_profiles if any academic field was provided
    const hasAcademic = input.rollNumber !== undefined || input.department !== undefined
      || input.year !== undefined || input.cgpa !== undefined;

    if (hasAcademic) {
      await this.userRepository.upsertStudentProfile(userId, {
        rollNumber: input.rollNumber,
        department: input.department,
        year: input.year,
        cgpa: input.cgpa,
      });
    }

    // Return fresh data from DB so the response reflects the actual saved state
    return this.userRepository.findProfileById(userId);
  }
}
