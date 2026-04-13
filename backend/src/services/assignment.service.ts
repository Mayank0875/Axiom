/**
 * services/assignment.service.ts — Assignment Business Logic
 *
 * WHAT IT DOES:
 *   Handles creating assignments and processing student submissions.
 *   Also triggers automatic notifications to enrolled students on creation.
 *
 * DESIGN PATTERN: Service Layer + Observer (fire-and-forget notification)
 *   Same pattern as QuizService — notification is a side-effect that won't
 *   block or fail the main assignment creation.
 *
 * DEPENDENCY INJECTION:
 *   AssignmentRepository and NotificationRepository injected via constructor.
 *   Follows Dependency Inversion Principle — service depends on abstractions.
 *
 * CONNECTS TO:
 *   - repositories/assignment.repository.ts (DB operations)
 *   - repositories/notification.repository.ts (bulk notify students)
 *   - models/assignment.model.ts (Assignment class)
 *   - models/submission.model.ts (Submission class)
 *   - controllers/assignment.controller.ts (called by route handlers)
 */

import { Assignment } from "../models/assignment.model";
import { Submission } from "../models/submission.model";
import { AssignmentRepository } from "../repositories/assignment.repository";
import { NotificationRepository } from "../repositories/notification.repository";

export class AssignmentService {
  constructor(
    private readonly assignmentRepository: AssignmentRepository,
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async listAssignments() {
    return this.assignmentRepository.list();
  }

  /** Create assignment and notify enrolled students (fire-and-forget) */
  public async createAssignment(input: {
    courseId: number;
    title: string;
    description: string;
    deadline: string;
    maxMarks: number;
    assignmentType: "file" | "mcq" | "coding";
  }) {
    const assignment = new Assignment(
      null,
      input.courseId,
      input.title,
      input.description,
      input.deadline,
      input.maxMarks,
      input.assignmentType
    );

    const created = await this.assignmentRepository.create(assignment);

    // Notify students — fire-and-forget
    this.notifyStudents(input.courseId, created.title, "assignment").catch(() => {});

    return created;
  }

  /** Student submits their work — upserts so re-submission is allowed */
  public async submitAssignment(input: {
    assignmentId: number;
    studentId: number;
    textSubmission?: string;
    fileUrl?: string;
  }) {
    const submission = new Submission(
      null,
      input.assignmentId,
      input.studentId,
      input.textSubmission ?? null,
      input.fileUrl ?? null,
      "submitted"
    );
    return this.assignmentRepository.submit(submission);
  }

  /** Private: notify all enrolled students about the new assignment */
  private async notifyStudents(courseId: number, title: string, type: "assignment") {
    const universityId = await this.notificationRepository.getUniversityIdByCourse(courseId);
    if (!universityId) return;

    const studentIds = await this.notificationRepository.getStudentIdsByCourse(courseId);
    if (!studentIds.length) return;

    await this.notificationRepository.bulkCreate(
      universityId,
      studentIds,
      `New Assignment: ${title}`,
      `A new assignment "${title}" has been posted. Check the Assignments section for details and deadline.`
    );
  }
}
