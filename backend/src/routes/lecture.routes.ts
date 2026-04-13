/**
 * routes/lecture.routes.ts — Lecture Routes
 *
 * WHAT IT DOES:
 *   Defines the endpoint for adding lectures to courses.
 *   Wires: LectureController → LectureService → LectureRepository.
 *
 * NOTE: No auth middleware currently — add authenticate + requireRole("faculty")
 *       when access control for lectures is needed.
 *
 * ENDPOINTS:
 *   POST /api/v1/lectures → add a lecture to a course
 *
 * CONNECTS TO:
 *   - controllers/lecture.controller.ts
 *   - routes/index.ts (mounted at /lectures)
 */

import { Router } from "express";
import { LectureController } from "../controllers/lecture.controller";
import { LectureRepository } from "../repositories/lecture.repository";
import { LectureService } from "../services/lecture.service";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

const lectureController = new LectureController(new LectureService(new LectureRepository()));

router.post("/", asyncHandler(lectureController.addLecture));

export default router;
