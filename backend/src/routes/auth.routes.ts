/**
 * routes/auth.routes.ts — Authentication Routes
 *
 * WHAT IT DOES:
 *   Defines public endpoints for user registration and login.
 *   Wires the dependency chain: AuthController → AuthService → AuthRepository.
 *
 * DESIGN PATTERN: Dependency Injection (manual constructor injection)
 *   The route file is responsible for assembling the object graph:
 *     new AuthController(new AuthService(new AuthRepository()))
 *   This means each layer only knows about the layer directly below it.
 *
 * WHY NO MIDDLEWARE HERE:
 *   Register and login are public — no JWT needed.
 *   All other routes require authenticate middleware.
 *
 * ENDPOINTS:
 *   POST /api/v1/auth/register  → register a new user (default role: student)
 *   POST /api/v1/auth/login     → login and receive JWT token
 *
 * CONNECTS TO:
 *   - controllers/auth.controller.ts
 *   - services/auth.service.ts
 *   - repositories/auth.repository.ts
 *   - utils/asyncHandler.ts (wraps async handlers for error forwarding)
 *   - routes/index.ts (this router is mounted at /auth)
 */

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// Assemble the dependency chain (Dependency Injection)
const authController = new AuthController(new AuthService(new AuthRepository()));

router.post("/register", asyncHandler(authController.register));
router.post("/login",    asyncHandler(authController.login));

export default router;
