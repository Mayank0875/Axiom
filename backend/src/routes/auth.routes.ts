import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

const authController = new AuthController(new AuthService(new AuthRepository()));

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

export default router;

