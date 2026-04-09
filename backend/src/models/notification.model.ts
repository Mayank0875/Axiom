export class Notification {
  constructor(
    public readonly id: number | null,
    public readonly universityId: number,
    public readonly userId: number,
    public readonly title: string,
    public readonly message: string
  ) {}
}

