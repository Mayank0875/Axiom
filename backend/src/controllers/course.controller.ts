/**
 * controllers/course.controller.ts — Course Controller
 *
 * LAYER: Controller
 *
 * WHAT IT DOES:
 *   Handles HTTP requests for course management.
 *   Reads req params/body, calls CourseService, returns JSON.
 *
 * ENDPOINTS HANDLED:
 *   GET  /courses                        → listCourses()   — all users
 *   POST /courses                        → createCourse()  — admin, faculty
 *   POST /courses/:courseId/faculty      → assignFaculty() — admin only
 *   POST /courses/:courseId/enrollments  → enrollStudent() — admin, faculty
 *
 * CONNECTS TO:
 *   - services/course.service.ts  (business logic)
 *   - routes/course.routes.ts     (instantiated here)
 */

import { Request, Response } from "express";
import { CourseService } from "../services/course.service";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /** GET /courses — returns all courses ordered by newest first */
  public listCourses = async (_req: Request, res: Response) => {
    const courses = await this.courseService.listCourses();
    res.status(200).json({ message: "Courses fetched successfully", data: courses });
  };

  /** POST /courses — create a new course for a university */
  public createCourse = async (req: Request, res: Response) => {
    const course = await this.courseService.createCourse(req.body);
    res.status(201).json({ message: "Course created successfully", data: course });
  };

  /** POST /courses/:courseId/faculty — assign a faculty member to teach this course */
  public assignFaculty = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const { facultyId } = req.body;
    const assignment = await this.courseService.assignFaculty(courseId, facultyId);
    res.status(200).json({ message: "Faculty assigned successfully", data: assignment });
  };

  /** POST /courses/:courseId/enrollments — enroll a student in this course */
  public enrollStudent = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const { studentId } = req.body;
    const enrollment = await this.courseService.enrollStudent(courseId, studentId);
    res.status(200).json({ message: "Student enrolled successfully", data: enrollment });
  };
}
