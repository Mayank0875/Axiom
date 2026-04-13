/**
 * models/course.model.ts — Course Domain Model
 *
 * WHAT IT DOES:
 *   Represents a course offered by a university.
 *
 * CONNECTS TO:
 *   - repositories/course.repository.ts (used in create())
 *   - services/course.service.ts (instantiated before DB insert)
 *
 * DB TABLE: courses
 *   A course belongs to a university and can have many lectures,
 *   assignments, quizzes, and enrolled students.
 */

export class Course {
  constructor(
    public readonly id: number | null,       // null before insert
    public readonly universityId: number,    // FK → universities.id
    public readonly title: string,
    public readonly courseCode: string,      // e.g. "CS301" — unique per university
    public readonly description: string
  ) {}
}
