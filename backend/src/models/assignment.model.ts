export type AssignmentType = "file" | "mcq" | "coding";

export class Assignment {
  constructor(
    public readonly id: number | null,
    public readonly courseId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly deadline: string,
    public readonly maxMarks: number,
    public readonly assignmentType: AssignmentType
  ) {}
}

