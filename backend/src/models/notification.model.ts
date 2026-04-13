/**
 * models/notification.model.ts — Notification Domain Model
 *
 * WHAT IT DOES:
 *   Represents a notification sent to a specific user.
 *
 * HOW NOTIFICATIONS ARE CREATED:
 *   1. Manually via POST /notifications (admin use)
 *   2. Automatically when faculty creates an assignment or quiz
 *      (NotificationRepository.bulkCreate sends to all enrolled students)
 *
 * CONNECTS TO:
 *   - repositories/notification.repository.ts (used in create())
 *   - services/notification.service.ts (instantiated before DB insert)
 *
 * DB TABLE: notifications
 *   read_at is NULL until the user opens the notification.
 */

export class Notification {
  constructor(
    public readonly id: number | null,      // null before insert
    public readonly universityId: number,   // FK → universities.id (for scoping)
    public readonly userId: number,         // FK → users.id (recipient)
    public readonly title: string,
    public readonly message: string         // full notification body
  ) {}
}
