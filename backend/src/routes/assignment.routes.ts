import { Router } from "express";
import { AssignmentController } from "../controllers/assignment.controller";
import { AssignmentRepository } from "../repositories/assignment.repository";
import { AssignmentService } from "../services/assignment.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

const assignmentController = new AssignmentController(
  new AssignmentService(new AssignmentRepository())
);

router.get("/", authenticate, asyncHandler(assignmentController.listAssignments));
router.post(
  "/",
  authenticate,
  requireRole("faculty"),
  asyncHandler(assignmentController.createAssignment)
);
router.post(
  "/submissions",
  authenticate,
  requireRole("student"),
  asyncHandler(assignmentController.submitAssignment)
);

export default router;

