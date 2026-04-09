import { db } from "../config/database";
import { Course } from "../models/course.model";

export class CourseRepository {
  public async list() {
    const query = `
      SELECT id, university_id, title, course_code, description, created_at
      FROM courses
      ORDER BY id DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  public async create(course: Course) {
    const query = `
      INSERT INTO courses (university_id, title, course_code, description, is_published, is_active, visibility)
      VALUES ($1, $2, $3, $4, false, true, 'private')
      RETURNING id, university_id, title, course_code, description
    `;

    const result = await db.query<Course>(query, [
      course.universityId,
      course.title,
      course.courseCode,
      course.description,
    ]);

    return result.rows[0];
  }

  public async assignFaculty(courseId: number, facultyId: number) {
    const query = `
      INSERT INTO course_faculty (course_id, faculty_id)
      VALUES ($1, $2)
      ON CONFLICT (course_id, faculty_id) DO NOTHING
      RETURNING id, course_id, faculty_id
    `;

    const result = await db.query(query, [courseId, facultyId]);
    return result.rows[0] ?? null;
  }

  public async enrollStudent(courseId: number, studentId: number) {
    const query = `
      INSERT INTO enrollment (student_id, course_id, enrolled_at, status)
      VALUES ($1, $2, NOW(), 'active')
      ON CONFLICT (student_id, course_id) DO NOTHING
      RETURNING id, student_id, course_id, status
    `;

    const result = await db.query(query, [studentId, courseId]);
    return result.rows[0] ?? null;
  }
}

