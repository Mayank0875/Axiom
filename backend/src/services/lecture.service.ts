/**
 * services/lecture.service.ts — Lecture Business Logic
 *
 * LAYER: Service
 *
 * WHAT IT DOES:
 *   Handles adding lectures to courses.
 *   Currently thin — the main value is the consistent layered structure.
 *   Future additions (ordering, publishing, section management) go here.
 *
 * DESIGN PATTERN: Service Layer
 *   Even simple operations go through the service layer.
 *   This keeps the architecture consistent and makes it easy to add
 *   validation (e.g. "course must exist before adding lecture") later.
 *
 * CONNECTS TO:
 *   - repositories/lecture.repository.ts  (DB insert)
 *   - models/lecture.model.ts             (Lecture class)
 *   - controllers/lecture.controller.ts   (called by addLecture handler)
 */

import { Lecture } from "../models/lecture.model";
import { LectureRepository } from "../repositories/lecture.repository";

export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) {}

  /**
   * Build Lecture model and persist.
   * Lecture starts as unpublished (is_published = false) — faculty publishes later.
   */
  public async addLecture(input: {
    courseId: number;
    title: string;
    description: string;
    videoUrl: string;
  }) {
    const lecture = new Lecture(null, input.courseId, input.title, input.description, input.videoUrl);
    return this.lectureRepository.create(lecture);
  }
}
