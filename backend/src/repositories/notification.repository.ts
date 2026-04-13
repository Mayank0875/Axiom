/**
 * repositories/notification.repository.ts — Notification Data Access
 *
 * LAYER: Repository
 *
 * WHAT IT DOES:
 *   All SQL for notifications: creating, fetching, bulk inserting,
 *   and resolving university/student IDs for auto-notification.
 *
 * DESIGN PATTERN: Repository Pattern
 *   SQL only. NotificationService and (directly) AssignmentService/QuizService
 *   call these methods for auto-notifications.
 *
 * KEY METHOD — bulkCreate():
 *   When faculty posts an assignment or quiz, we need to notify ALL enrolled students.
 *   Instead of N separate INSERT statements, bulkCreate() builds one INSERT with
 *   multiple VALUES rows — much more efficient for large classes.
 *
 * KEY METHOD — getAllByUniversity():
 *   Used by admin/faculty to see all notifications in their org.
 *   Uses a subquery with json_agg to return roles as a real JSON array
 *   (not a PostgreSQL array string like "{admin}").
 *
 * CONNECTS TO:
 *   - config/database.ts               (db.query)
 *   - models/notification.model.ts     (Notification type)
 *   - services/notification.service.ts (primary caller)
 *   - services/assignment.service.ts   (calls bulkCreate directly)
 *   - services/quiz.service.ts         (calls bulkCreate directly)
 */

import { db } from "../config/database";
import { Notification } from "../models/notification.model";

export class NotificationRepository {

  /** Insert a single notification for one user */
  public async create(notification: Notification) {
    const result = await db.query(
      `INSERT INTO notifications (university_id, user_id, title, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, university_id, user_id, title, message, created_at, read_at`,
      [notification.universityId, notification.userId, notification.title, notification.message]
    );
    return result.rows[0];
  }

  /** Get all notifications for a specific user, newest first */
  public async getByUser(userId: number) {
    const result = await db.query(
      `SELECT id, university_id, user_id, title, message, created_at, read_at
       FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  /**
   * Look up which university a user belongs to.
   * Used by NotificationController to scope getAllByUniversity correctly.
   */
  public async getUniversityIdForUser(userId: number): Promise<number> {
    const result = await db.query(
      `SELECT university_id FROM users WHERE id = $1`,
      [userId]
    );
    return Number(result.rows[0]?.university_id ?? 0);
  }

  /**
   * All notifications in a university — for admin/faculty view.
   * Uses json_agg for roles so the pg driver returns a real JS array,
   * not a PostgreSQL array string like "{admin,student}".
   */
  public async getAllByUniversity(universityId: number) {
    const result = await db.query(
      `SELECT
         n.id, n.title, n.message, n.created_at, n.read_at,
         u.id        AS recipient_id,
         u.full_name AS recipient_name,
         u.email     AS recipient_email,
         COALESCE(
           (SELECT json_agg(r.name ORDER BY r.name)
            FROM user_roles ur JOIN roles r ON r.id = ur.role_id
            WHERE ur.user_id = u.id),
           '[]'::json
         ) AS recipient_roles
       FROM notifications n
       JOIN users u ON u.id = n.user_id
       WHERE n.university_id = $1
       ORDER BY n.created_at DESC`,
      [universityId]
    );
    return result.rows;
  }

  /** Get all active student IDs in a university — used for university-wide notifications */
  public async getStudentIdsByUniversity(universityId: number): Promise<number[]> {
    const result = await db.query(
      `SELECT u.id FROM users u
       JOIN user_roles ur ON ur.user_id = u.id
       JOIN roles r ON r.id = ur.role_id
       WHERE u.university_id = $1 AND r.name = 'student' AND u.is_active = TRUE`,
      [universityId]
    );
    return result.rows.map((r) => Number((r as { id: number }).id));
  }

  /** Get all student IDs actively enrolled in a specific course */
  public async getStudentIdsByCourse(courseId: number): Promise<number[]> {
    const result = await db.query(
      `SELECT e.student_id FROM enrollment e
       WHERE e.course_id = $1 AND e.status = 'active'`,
      [courseId]
    );
    return result.rows.map((r) => Number((r as { student_id: number }).student_id));
  }

  /** Get the university_id for a course — needed to scope bulk notifications */
  public async getUniversityIdByCourse(courseId: number): Promise<number | null> {
    const result = await db.query(
      `SELECT university_id FROM courses WHERE id = $1`,
      [courseId]
    );
    return result.rows[0]?.university_id ? Number(result.rows[0].university_id) : null;
  }

  /**
   * Bulk insert notifications for multiple users in ONE SQL statement.
   * Much more efficient than N separate INSERTs for large classes.
   *
   * Builds: INSERT INTO notifications VALUES ($1,$2,$3,$4), ($1,$5,$3,$4), ...
   * $1 = universityId, $2 = title, $3 = message, $4+ = each userId
   */
  public async bulkCreate(
    universityId: number,
    userIds: number[],
    title: string,
    message: string
  ): Promise<void> {
    if (!userIds.length) return;

    const values: unknown[] = [universityId, title, message];
    const placeholders = userIds.map((userId) => {
      values.push(userId);
      return `($1, $${values.length}, $2, $3)`;
    });

    await db.query(
      `INSERT INTO notifications (university_id, user_id, title, message)
       VALUES ${placeholders.join(", ")}`,
      values
    );
  }
}
