/**
 * repositories/course.repository.ts — Course Data Access
 *
 * LAYER: Repository
 *
 * WHAT IT DOES:
 *   All SQL for courses: listing, creating, assigning faculty, enrolling students.
 *
 * DESIGN PATTERN: Repository Pattern
 *   SQL lives here. CourseService calls these methods — never writes SQL itself.
 *
 * KEY SQL DECISIONS:
 *   - create(): course starts as is_published=false, is_active=true, visibility='private'
 *     Faculty must explicitly publish it later.
 *   - assignFaculty(): ON CONFLICT DO NOTHING — returns null if already assigned.
 *     Service converts null → 409 error.
 *   - enrollStudent(): same pattern — null on duplicate → 409 in service.
 *
 * CONNECTS TO:
 *   - config/database.ts      (db.query)
 *   - models/course.model.ts  (Course type for parameterized insert)
 *   - services/course.service.ts (only caller)
 */

import { db } from "../config/database";
import { Course } from "../models/course.model";

export class CourseRepository {

  /** List all courses, newest first */
  public async list() {
    const result = await db.query(
      `SELECT id, university_id, title, course_code, description, created_at
       FROM courses ORDER BY id DESC`
    );
    return result.rows;
  }

  /**
   * Insert a new course.
   * Starts unpublished and private — faculty publishes when ready.
   */
  public async create(course: Course) {
    const result = await db.query<Course>(
      `INSERT INTO courses (university_id, title, course_code, description, is_published, is_active, visibility)
       VALUES ($1, $2, $3, $4, false, true, 'private')
       RETURNING id, university_id, title, course_code, description`,
      [course.universityId, course.title, course.courseCode, course.description]
    );
    return result.rows[0];
  }

  /**
   * Link a faculty member to a course.
   * Returns null if already linked (ON CONFLICT DO NOTHING).
   * Service converts null → 409 Conflict.
   */
  public async assignFaculty(courseId: number, facultyId: number) {
    const result = await db.query(
      `INSERT INTO course_faculty (course_id, faculty_id)
       VALUES ($1, $2)
       ON CONFLICT (course_id, faculty_id) DO NOTHING
       RETURNING id, course_id, faculty_id`,
      [courseId, facultyId]
    );
    return result.rows[0] ?? null;
  }

  /**
   * Enroll a student in a course with status 'active'.
   * Returns null if already enrolled (ON CONFLICT DO NOTHING).
   * Service converts null → 409 Conflict.
   */
  public async enrollStudent(courseId: number, studentId: number) {
    const result = await db.query(
      `INSERT INTO enrollment (student_id, course_id, enrolled_at, status)
       VALUES ($1, $2, NOW(), 'active')
       ON CONFLICT (student_id, course_id) DO NOTHING
       RETURNING id, student_id, course_id, status`,
      [studentId, courseId]
    );
    return result.rows[0] ?? null;
  }
}
