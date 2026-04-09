export type SubmissionStatus = "submitted" | "late" | "graded";

export class Submission {
  constructor(
    public readonly id: number | null,
    public readonly assignmentId: number,
    public readonly studentId: number,
    public readonly textSubmission: string | null,
    public readonly fileUrl: string | null,
    public readonly status: SubmissionStatus
  ) {}
}

