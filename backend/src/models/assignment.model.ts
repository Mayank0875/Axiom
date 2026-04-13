/**
 * models/assignment.model.ts — Assignment Domain Model
 *
 * WHAT IT DOES:
 *   Represents an assignment posted by faculty for a course.
 *
 * ASSIGNMENT TYPES:
 *   - file    → student uploads a document
 *   - mcq     → multiple choice questions
 *   - coding  → programming problem
 *
 * CONNECTS TO:
 *   - repositories/assignment.repository.ts (used in create())
 *   - services/assignment.service.ts (instantiated before DB insert)
 *
 * DB TABLE: assignments
 */

export type AssignmentType = "file" | "mcq" | "coding";

export class Assignment {
  constructor(
    public readonly id: number | null,             // null before insert
    public readonly courseId: number,              // FK → courses.id
    public readonly title: string,
    public readonly description: string,
    public readonly deadline: string,              // ISO timestamp string
    public readonly maxMarks: number,
    public readonly assignmentType: AssignmentType
  ) {}
}
