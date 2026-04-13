/**
 * routes/course.routes.ts — Course Routes
 *
 * WHAT IT DOES:
 *   Defines endpoints for course management.
 *   Wires: CourseController → CourseService → CourseRepository.
 *
 * ROLE PROTECTION:
 *   GET /                    → any authenticated user (students browse courses)
 *   POST /                   → admin or faculty (create course)
 *   POST /:id/faculty        → admin only (assign faculty to course)
 *   POST /:id/enrollments    → admin or faculty (enroll student)
 *
 * ENDPOINTS:
 *   GET  /api/v1/courses                       → list all courses
 *   POST /api/v1/courses                       → create a course
 *   POST /api/v1/courses/:courseId/faculty     → assign faculty to course
 *   POST /api/v1/courses/:courseId/enrollments → enroll a student
 *
 * CONNECTS TO:
 *   - controllers/course.controller.ts
 *   - middlewares/auth.middleware.ts
 *   - middlewares/role.middleware.ts
 *   - routes/index.ts (mounted at /courses)
 */

import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { CourseRepository } from "../repositories/course.repository";
import { CourseService } from "../services/course.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

const courseController = new CourseController(new CourseService(new CourseRepository()));

router.get("/",  authenticate, asyncHandler(courseController.listCourses));
router.post("/", authenticate, requireRole("admin", "faculty"), asyncHandler(courseController.createCourse));

router.post("/:courseId/faculty",     authenticate, requireRole("admin"),           asyncHandler(courseController.assignFaculty));
router.post("/:courseId/enrollments", authenticate, requireRole("admin", "faculty"), asyncHandler(courseController.enrollStudent));

export default router;
