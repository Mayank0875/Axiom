/**
 * repositories/assignment.repository.ts — Assignment Data Access
 *
 * LAYER: Repository
 *
 * WHAT IT DOES:
 *   All SQL for assignments and submissions:
 *   listing assignments, creating assignments, and handling student submissions.
 *
 * DESIGN PATTERN: Repository Pattern
 *   SQL only. AssignmentService calls these methods.
 *
 * KEY SQL DECISIONS:
 *   - create(): late_submission_allowed defaults to true.
 *     assignment_type is cast to the PostgreSQL enum type.
 *   - submit(): uses ON CONFLICT ... DO UPDATE (upsert).
 *     A student can re-submit — the existing row is updated.
 *     This is intentional: students can revise before the deadline.
 *
 * CONNECTS TO:
 *   - config/database.ts          (db.query)
 *   - models/assignment.model.ts  (Assignment type)
 *   - models/submission.model.ts  (Submission type)
 *   - services/assignment.service.ts (only caller)
 */

import { db } from "../config/database";
import { Assignment } from "../models/assignment.model";
import { Submission } from "../models/submission.model";

export class AssignmentRepository {

  /** List all assignments, newest first */
  public async list() {
    const result = await db.query(
      `SELECT id, course_id, title, description, deadline, max_marks, assignment_type, created_at
       FROM assignments ORDER BY id DESC`
    );
    return result.rows;
  }

  /**
   * Insert a new assignment.
   * assignment_type is cast to the PostgreSQL enum (file|mcq|coding).
   */
  public async create(assignment: Assignment) {
    const result = await db.query<Assignment>(
      `INSERT INTO assignments (course_id, title, description, deadline, max_marks, late_submission_allowed, assignment_type)
       VALUES ($1, $2, $3, $4, $5, true, $6::assignment_type_enum)
       RETURNING id, course_id, title, description, deadline, max_marks, assignment_type`,
      [assignment.courseId, assignment.title, assignment.description,
       assignment.deadline, assignment.maxMarks, assignment.assignmentType]
    );
    return result.rows[0];
  }

  /**
   * Insert or update a student's submission.
   * ON CONFLICT (assignment_id, student_id) DO UPDATE — allows re-submission.
   * submitted_at is always updated to the latest submission time.
   */
  public async submit(submission: Submission) {
    const result = await db.query<Submission>(
      `INSERT INTO submissions (assignment_id, student_id, text_submission, file_url, status, submitted_at)
       VALUES ($1, $2, $3, $4, $5::submission_status, NOW())
       ON CONFLICT (assignment_id, student_id) DO UPDATE SET
         text_submission = EXCLUDED.text_submission,
         file_url        = EXCLUDED.file_url,
         status          = EXCLUDED.status,
         submitted_at    = NOW()
       RETURNING id, assignment_id, student_id, text_submission, file_url, status`,
      [submission.assignmentId, submission.studentId,
       submission.textSubmission, submission.fileUrl, submission.status]
    );
    return result.rows[0];
  }
}
