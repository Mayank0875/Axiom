import { db } from "../config/database";
import { Lecture } from "../models/lecture.model";

export class LectureRepository {
  public async create(lecture: Lecture) {
    const query = `
      INSERT INTO lectures (course_id, title, description, video_url, is_published)
      VALUES ($1, $2, $3, $4, false)
      RETURNING id, course_id, title, description, video_url
    `;

    const result = await db.query<Lecture>(query, [
      lecture.courseId,
      lecture.title,
      lecture.description,
      lecture.videoUrl,
    ]);

    return result.rows[0];
  }
}

