export type UserRole = "admin" | "faculty" | "student";

export class User {
  constructor(
    public readonly id: number | null,
    public readonly universityId: number,
    public readonly fullName: string,
    public readonly email: string,
    public readonly passwordHash: string
  ) {}
}

