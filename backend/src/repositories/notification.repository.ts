import { db } from "../config/database";
import { Notification } from "../models/notification.model";

export class NotificationRepository {
  public async create(notification: Notification) {
    const query = `
      INSERT INTO notifications (university_id, user_id, title, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, university_id, user_id, title, message, created_at, read_at
    `;

    const result = await db.query(query, [
      notification.universityId,
      notification.userId,
      notification.title,
      notification.message,
    ]);

    return result.rows[0];
  }

  public async getByUser(userId: number) {
    const query = `
      SELECT id, university_id, user_id, title, message, created_at, read_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }
}

