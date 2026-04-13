/**
 * models/submission.model.ts — Submission Domain Model
 *
 * WHAT IT DOES:
 *   Represents a student's submission for an assignment.
 *
 * STATUS FLOW:
 *   submitted → late (if after deadline) → graded (after faculty reviews)
 *
 * CONNECTS TO:
 *   - repositories/assignment.repository.ts (used in submit())
 *   - services/assignment.service.ts (instantiated before DB insert)
 *
 * DB TABLE: submissions
 *   Unique constraint on (assignment_id, student_id) — one submission per student per assignment.
 *   Re-submitting updates the existing row (upsert).
 */

export type SubmissionStatus = "submitted" | "late" | "graded";

export class Submission {
  constructor(
    public readonly id: number | null,              // null before insert
    public readonly assignmentId: number,           // FK → assignments.id
    public readonly studentId: number,              // FK → users.id
    public readonly textSubmission: string | null,  // text answer (optional)
    public readonly fileUrl: string | null,         // uploaded file URL (optional)
    public readonly status: SubmissionStatus
  ) {}
}
