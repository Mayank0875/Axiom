/**
 * repositories/lecture.repository.ts — Lecture Data Access
 *
 * LAYER: Repository
 *
 * WHAT IT DOES:
 *   Inserts new lecture records into the database.
 *
 * DESIGN PATTERN: Repository Pattern
 *   Single responsibility — only SQL for lectures.
 *
 * NOTE:
 *   is_published defaults to false — faculty must explicitly publish lectures.
 *   This allows drafting content before students can see it.
 *
 * CONNECTS TO:
 *   - config/database.ts       (db.query)
 *   - models/lecture.model.ts  (Lecture type)
 *   - services/lecture.service.ts (only caller)
 */

import { db } from "../config/database";
import { Lecture } from "../models/lecture.model";

export class LectureRepository {

  /**
   * Insert a new lecture.
   * Starts unpublished (is_published = false).
   */
  public async create(lecture: Lecture) {
    const result = await db.query<Lecture>(
      `INSERT INTO lectures (course_id, title, description, video_url, is_published)
       VALUES ($1, $2, $3, $4, false)
       RETURNING id, course_id, title, description, video_url`,
      [lecture.courseId, lecture.title, lecture.description, lecture.videoUrl]
    );
    return result.rows[0];
  }
}
