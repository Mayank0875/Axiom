import { db } from "../config/database";
import { Assignment } from "../models/assignment.model";
import { Submission } from "../models/submission.model";

export class AssignmentRepository {
  public async list() {
    const query = `
      SELECT id, course_id, title, description, deadline, max_marks, assignment_type, created_at
      FROM assignments
      ORDER BY id DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  public async create(assignment: Assignment) {
    const query = `
      INSERT INTO assignments (course_id, title, description, deadline, max_marks, late_submission_allowed, assignment_type)
      VALUES ($1, $2, $3, $4, $5, true, $6::assignment_type_enum)
      RETURNING id, course_id, title, description, deadline, max_marks, assignment_type
    `;

    const result = await db.query<Assignment>(query, [
      assignment.courseId,
      assignment.title,
      assignment.description,
      assignment.deadline,
      assignment.maxMarks,
      assignment.assignmentType,
    ]);

    return result.rows[0];
  }

  public async submit(submission: Submission) {
    const query = `
      INSERT INTO submissions (assignment_id, student_id, text_submission, file_url, status, submitted_at)
      VALUES ($1, $2, $3, $4, $5::submission_status, NOW())
      ON CONFLICT (assignment_id, student_id)
      DO UPDATE SET
        text_submission = EXCLUDED.text_submission,
        file_url = EXCLUDED.file_url,
        status = EXCLUDED.status,
        submitted_at = NOW()
      RETURNING id, assignment_id, student_id, text_submission, file_url, status
    `;

    const result = await db.query<Submission>(query, [
      submission.assignmentId,
      submission.studentId,
      submission.textSubmission,
      submission.fileUrl,
      submission.status,
    ]);

    return result.rows[0];
  }
}

