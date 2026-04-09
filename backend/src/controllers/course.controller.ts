import { Request, Response } from "express";
import { CourseService } from "../services/course.service";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  public listCourses = async (_req: Request, res: Response) => {
    const courses = await this.courseService.listCourses();
    res.status(200).json({ message: "Courses fetched successfully", data: courses });
  };

  public createCourse = async (req: Request, res: Response) => {
    const course = await this.courseService.createCourse(req.body);
    res.status(201).json({ message: "Course created successfully", data: course });
  };

  public assignFaculty = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const { facultyId } = req.body;
    const assignment = await this.courseService.assignFaculty(courseId, facultyId);
    res.status(200).json({ message: "Faculty assigned successfully", data: assignment });
  };

  public enrollStudent = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const { studentId } = req.body;
    const enrollment = await this.courseService.enrollStudent(courseId, studentId);
    res.status(200).json({ message: "Student enrolled successfully", data: enrollment });
  };
}

