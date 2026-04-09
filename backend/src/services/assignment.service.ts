import { Assignment } from "../models/assignment.model";
import { Submission } from "../models/submission.model";
import { AssignmentRepository } from "../repositories/assignment.repository";

export class AssignmentService {
  constructor(private readonly assignmentRepository: AssignmentRepository) {}

  public async listAssignments() {
    return this.assignmentRepository.list();
  }

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
    return this.assignmentRepository.create(assignment);
  }

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
}

