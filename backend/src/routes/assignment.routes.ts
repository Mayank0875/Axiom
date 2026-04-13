/**
 * routes/assignment.routes.ts — Assignment Routes
 *
 * WHAT IT DOES:
 *   Defines endpoints for assignment management and student submissions.
 *   Wires: AssignmentController → AssignmentService → AssignmentRepository + NotificationRepository.
 *
 * WHY TWO REPOSITORIES IN THE SERVICE:
 *   AssignmentService needs NotificationRepository to auto-notify students
 *   when a new assignment is created. Both are injected here.
 *
 * ROLE PROTECTION:
 *   GET /              → any authenticated user
 *   POST /             → faculty only (create assignment)
 *   POST /submissions  → student only (submit work)
 *
 * ENDPOINTS:
 *   GET  /api/v1/assignments             → list all assignments
 *   POST /api/v1/assignments             → create assignment (notifies students)
 *   POST /api/v1/assignments/submissions → student submits work
 *
 * CONNECTS TO:
 *   - controllers/assignment.controller.ts
 *   - services/assignment.service.ts
 *   - repositories/assignment.repository.ts
 *   - repositories/notification.repository.ts (for auto-notifications)
 *   - middlewares/auth.middleware.ts
 *   - middlewares/role.middleware.ts
 *   - routes/index.ts (mounted at /assignments)
 */

import { Router } from "express";
import { AssignmentController } from "../controllers/assignment.controller";
import { AssignmentRepository } from "../repositories/assignment.repository";
import { AssignmentService } from "../services/assignment.service";
import { NotificationRepository } from "../repositories/notification.repository";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Inject both repositories — AssignmentService needs NotificationRepository for auto-notify
const assignmentController = new AssignmentController(
  new AssignmentService(new AssignmentRepository(), new NotificationRepository())
);

router.get("/",  authenticate, asyncHandler(assignmentController.listAssignments));
router.post("/", authenticate, requireRole("faculty"), asyncHandler(assignmentController.createAssignment));
router.post("/submissions", authenticate, requireRole("student"), asyncHandler(assignmentController.submitAssignment));

export default router;
