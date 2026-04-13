/**
 * controllers/user.controller.ts — User Controller
 *
 * LAYER: Controller
 *
 * WHAT IT DOES:
 *   Handles HTTP requests for user management and profile operations.
 *   Reads req params/body, calls UserService, returns JSON.
 *
 * ENDPOINTS HANDLED:
 *   GET    /users          → getUsers()       — admin only, list all users
 *   POST   /users          → createUser()     — public, create a user
 *   POST   /users/:id/roles → assignRole()    — admin only, assign a role
 *   GET    /users/me       → getMyProfile()   — authenticated, full profile
 *   PATCH  /users/me       → updateMyProfile()— authenticated, update profile
 *
 * WHY /me BEFORE /:userId:
 *   Express matches routes top-to-bottom. If /:userId was first,
 *   GET /users/me would match with userId = "me" (wrong).
 *   So /me routes are registered first in user.routes.ts.
 *
 * CONNECTS TO:
 *   - services/user.service.ts  (all business logic)
 *   - routes/user.routes.ts     (instantiated here)
 *   - types/express.d.ts        (req.user type)
 */

import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  /** GET /users — admin only, returns all users in the system */
  public getUsers = async (_req: Request, res: Response) => {
    const users = await this.userService.listUsers();
    res.status(200).json({ message: "Users fetched successfully", data: users });
  };

  /** POST /users — create a new user (used internally by auth flow) */
  public createUser = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
  };

  /** POST /users/:userId/roles — admin assigns a role to a user */
  public assignRole = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const role = req.body.role;
    const result = await this.userService.assignRole(userId, role);
    res.status(200).json({ message: "Role assigned successfully", data: result });
  };

  /**
   * GET /users/me — returns the full profile of the logged-in user
   * Includes: university, roles, student/faculty profile, program, batch
   * req.user is set by authenticate middleware
   */
  public getMyProfile = async (req: Request, res: Response) => {
    const userId = req.user!.userId; // set by authenticate middleware
    const profile = await this.userService.getMyProfile(userId);
    res.status(200).json({ message: "Profile fetched successfully", data: profile });
  };

  /**
   * PATCH /users/me — update name, email, phone, and academic details
   * Only updates fields that are provided (partial update)
   */
  public updateMyProfile = async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const universityId = Number(req.body.universityId ?? 0);
    const updated = await this.userService.updateMyProfile(userId, universityId, req.body);
    res.status(200).json({ message: "Profile updated successfully", data: updated });
  };
}
