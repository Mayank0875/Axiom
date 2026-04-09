import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

const userController = new UserController(
  new UserService(new UserRepository())
);

router.get(
  "/",
  authenticate,
  requireRole("admin"),
  asyncHandler(userController.getUsers)
);
router.post("/", asyncHandler(userController.createUser));
router.post(
  "/:userId/roles",
  authenticate,
  requireRole("admin"),
  asyncHandler(userController.assignRole)
);

export default router;

