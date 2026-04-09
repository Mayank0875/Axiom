import { User, UserRole } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { HttpError } from "../utils/httpError";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async listUsers() {
    return this.userRepository.listUsers();
  }

  public async createUser(input: {
    universityId: number;
    fullName: string;
    email: string;
    passwordHash: string;
  }) {
    if (!input.email.includes("@")) {
      throw new HttpError(400, "Please provide a valid email.");
    }

    const user = new User(
      null,
      input.universityId,
      input.fullName,
      input.email.toLowerCase(),
      input.passwordHash
    );

    return this.userRepository.create(user);
  }

  public async assignRole(userId: number, role: UserRole) {
    const assignedRole = await this.userRepository.assignRole(userId, role);
    if (!assignedRole) {
      throw new HttpError(404, "Role not found or role already assigned.");
    }
    return assignedRole;
  }
}

