/**
 * controllers/lecture.controller.ts — Lecture Controller
 *
 * LAYER: Controller
 *
 * WHAT IT DOES:
 *   Handles HTTP requests for adding lectures to courses.
 *
 * ENDPOINTS HANDLED:
 *   POST /lectures → addLecture() — faculty adds a lecture to a course
 *
 * WHY SO SMALL:
 *   Lectures currently only support creation. Read operations (listing lectures
 *   per course) would be added here when needed — the pattern is already in place.
 *
 * CONNECTS TO:
 *   - services/lecture.service.ts  (business logic)
 *   - routes/lecture.routes.ts     (instantiated here)
 */

import { Request, Response } from "express";
import { LectureService } from "../services/lecture.service";

export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  /**
   * POST /lectures
   * Body: { courseId, title, description, videoUrl }
   * Returns: the created lecture record
   */
  public addLecture = async (req: Request, res: Response) => {
    const lecture = await this.lectureService.addLecture(req.body);
    res.status(201).json({ message: "Lecture added successfully", data: lecture });
  };
}
