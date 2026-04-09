import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { CourseRepository } from "../repositories/course.repository";
import { CourseService } from "../services/course.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

const courseController = new CourseController(
  new CourseService(new CourseRepository())
);

router.get("/", authenticate, asyncHandler(courseController.listCourses));
router.post(
  "/",
  authenticate,
  requireRole("admin", "faculty"),
  asyncHandler(courseController.createCourse)
);
router.post(
  "/:courseId/faculty",
  authenticate,
  requireRole("admin"),
  asyncHandler(courseController.assignFaculty)
);
router.post(
  "/:courseId/enrollments",
  authenticate,
  requireRole("admin", "faculty"),
  asyncHandler(courseController.enrollStudent)
);

export default router;

