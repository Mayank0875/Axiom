/**
 * routes/user.routes.ts — User Routes
 *
 * WHAT IT DOES:
 *   Defines endpoints for user management and profile operations.
 *   Wires: UserController → UserService → UserRepository.
 *
 * CRITICAL ROUTE ORDER:
 *   /me routes MUST be registered BEFORE /:userId.
 *   If /:userId comes first, Express matches GET /users/me with userId = "me"
 *   which causes a NaN error when Number("me") is called.
 *   Always put specific static paths before parameterized paths.
 *
 * ROLE PROTECTION:
 *   GET /         → admin only (list all users)
 *   GET /me       → any authenticated user (own profile)
 *   PATCH /me     → any authenticated user (update own profile)
 *   POST /        → public (used by auth register flow)
 *   POST /:id/roles → admin only (assign roles)
 *
 * ENDPOINTS:
 *   GET    /api/v1/users/me          → full profile (university, roles, academic data)
 *   PATCH  /api/v1/users/me          → update name, email, phone, academic fields
 *   GET    /api/v1/users             → list all users (admin only)
 *   POST   /api/v1/users             → create user (public)
 *   POST   /api/v1/users/:id/roles   → assign role (admin only)
 *
 * CONNECTS TO:
 *   - controllers/user.controller.ts
 *   - middlewares/auth.middleware.ts  (authenticate)
 *   - middlewares/role.middleware.ts  (requireRole)
 *   - routes/index.ts (mounted at /users)
 */

import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

const userController = new UserController(new UserService(new UserRepository()));

// /me MUST come before /:userId — see note above
router.get("/me",    authenticate, asyncHandler(userController.getMyProfile));
router.patch("/me",  authenticate, asyncHandler(userController.updateMyProfile));

// Admin-only: list all users
router.get("/",      authenticate, requireRole("admin"), asyncHandler(userController.getUsers));

// Public: create user (called internally by auth register)
router.post("/",     asyncHandler(userController.createUser));

// Admin-only: assign a role to a user
router.post("/:userId/roles", authenticate, requireRole("admin"), asyncHandler(userController.assignRole));

export default router;
