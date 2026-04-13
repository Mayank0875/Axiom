/**
 * services/course.service.ts — Course Business Logic
 *
 * LAYER: Service
 *
 * WHAT IT DOES:
 *   Handles course creation, faculty assignment, and student enrollment.
 *
 * DESIGN PATTERN: Service Layer
 *   Business rules (duplicate detection, conflict handling) live here.
 *   The repository just runs SQL — this service decides what's allowed.
 *
 * KEY RULES:
 *   - A faculty member can only be assigned to a course once (409 if duplicate)
 *   - A student can only enroll in a course once (409 if duplicate)
 *   - These constraints are also enforced at DB level (UNIQUE constraints)
 *     but we check here to return a meaningful error message.
 *
 * CONNECTS TO:
 *   - repositories/course.repository.ts  (DB operations)
 *   - models/course.model.ts             (Course class)
 *   - utils/httpError.ts                 (throws on conflict)
 *   - controllers/course.controller.ts   (called by route handlers)
 */

import { Course } from "../models/course.model";
import { CourseRepository } from "../repositories/course.repository";
import { HttpError } from "../utils/httpError";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  /** Returns all courses ordered by newest first */
  public async listCourses() {
    return this.courseRepository.list();
  }

  /** Build Course model and persist — course starts as unpublished/private */
  public async createCourse(input: {
    universityId: number;
    title: string;
    courseCode: string;
    description: string;
  }) {
    const course = new Course(null, input.universityId, input.title, input.courseCode, input.description);
    return this.courseRepository.create(course);
  }

  /**
   * Assign a faculty member to teach a course.
   * Returns 409 if already assigned (repository returns null on conflict).
   */
  public async assignFaculty(courseId: number, facultyId: number) {
    const assignment = await this.courseRepository.assignFaculty(courseId, facultyId);
    if (!assignment) {
      throw new HttpError(409, "Faculty already assigned to this course.");
    }
    return assignment;
  }

  /**
   * Enroll a student in a course.
   * Returns 409 if already enrolled (repository returns null on conflict).
   */
  public async enrollStudent(courseId: number, studentId: number) {
    const enrollment = await this.courseRepository.enrollStudent(courseId, studentId);
    if (!enrollment) {
      throw new HttpError(409, "Student is already enrolled in this course.");
    }
    return enrollment;
  }
}
