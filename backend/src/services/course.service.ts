import { Course } from "../models/course.model";
import { CourseRepository } from "../repositories/course.repository";
import { HttpError } from "../utils/httpError";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  public async listCourses() {
    return this.courseRepository.list();
  }

  public async createCourse(input: {
    universityId: number;
    title: string;
    courseCode: string;
    description: string;
  }) {
    const course = new Course(
      null,
      input.universityId,
      input.title,
      input.courseCode,
      input.description
    );
    return this.courseRepository.create(course);
  }

  public async assignFaculty(courseId: number, facultyId: number) {
    const assignment = await this.courseRepository.assignFaculty(courseId, facultyId);
    if (!assignment) {
      throw new HttpError(409, "Faculty already assigned to this course.");
    }
    return assignment;
  }

  public async enrollStudent(courseId: number, studentId: number) {
    const enrollment = await this.courseRepository.enrollStudent(courseId, studentId);
    if (!enrollment) {
      throw new HttpError(409, "Student is already enrolled in this course.");
    }
    return enrollment;
  }
}

