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
    if (!input.email.includes("@")) {
      throw new HttpError(400, "Please provide a valid email.");
    }
    if (input.password.length < 6) {
      throw new HttpError(400, "Password must be at least 6 characters.");
    }

    const existing = await this.authRepository.findByEmail(input.email.toLowerCase());
    if (existing) {
      throw new HttpError(409, "Email is already registered.");
    }

    const passwordHash = await hashPassword(input.password);
    const user = await this.authRepository.createUser({
      universityId: input.universityId,
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      passwordHash,
    });

    await this.authRepository.assignDefaultStudentRole(user.id);
    const roles = await this.authRepository.getUserRoles(user.id);
    const token = generateToken({ userId: user.id, roles });

    return { token, user, roles };
  }

  public async loginUser(input: { email: string; password: string }) {
    const user = await this.authRepository.findByEmail(input.email.toLowerCase());
    if (!user) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const isPasswordCorrect = await comparePassword(
      input.password,
      user.password_hash
    );
    if (!isPasswordCorrect) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const roles = await this.authRepository.getUserRoles(user.id);
    const token = generateToken({ userId: user.id, roles });

    return {
      token,
      user: {
        id: user.id,
        university_id: user.university_id,
        full_name: user.full_name,
        email: user.email,
      },
      roles,
    };
  }
}

