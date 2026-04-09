export class Quiz {
  constructor(
    public readonly id: number | null,
    public readonly courseId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly maxAttempts: number,
    public readonly totalMarks: number
  ) {}
}

