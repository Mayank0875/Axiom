export class Course {
  constructor(
    public readonly id: number | null,
    public readonly universityId: number,
    public readonly title: string,
    public readonly courseCode: string,
    public readonly description: string
  ) {}
}

