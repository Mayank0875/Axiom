/**
 * services/notification.service.ts — Notification Business Logic
 *
 * LAYER: Service
 *
 * WHAT IT DOES:
 *   Handles creating, fetching, and managing notifications.
 *   Also resolves which university a user belongs to (needed for admin view).
 *
 * TWO WAYS NOTIFICATIONS ARE CREATED:
 *   1. Manually via this service (POST /notifications)
 *   2. Automatically as a side-effect in AssignmentService and QuizService
 *      (those services call NotificationRepository.bulkCreate directly)
 *
 * ADMIN/FACULTY VIEW:
 *   getAllNotifications() returns ALL notifications for a university.
 *   The controller calls getUniversityIdForUser() first to scope the query
 *   to the right university without requiring the client to send universityId.
 *
 * CONNECTS TO:
 *   - repositories/notification.repository.ts  (all DB operations)
 *   - models/notification.model.ts             (Notification class)
 *   - controllers/notification.controller.ts   (called by all handlers)
 */

import { Notification } from "../models/notification.model";
import { NotificationRepository } from "../repositories/notification.repository";

export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  /** Manually create a single notification for a specific user */
  public async createNotification(input: {
    universityId: number;
    userId: number;
    title: string;
    message: string;
  }) {
    const notification = new Notification(null, input.universityId, input.userId, input.title, input.message);
    return this.notificationRepository.create(notification);
  }

  /** Get all notifications for a specific user, newest first */
  public async getUserNotifications(userId: number) {
    return this.notificationRepository.getByUser(userId);
  }

  /**
   * Get ALL notifications in a university — for admin/faculty dashboard.
   * Includes recipient details (name, email, roles) and read status.
   */
  public async getAllNotifications(universityId: number) {
    return this.notificationRepository.getAllByUniversity(universityId);
  }

  /**
   * Look up which university a user belongs to.
   * Used by the controller to scope getAllNotifications to the right org.
   */
  public async getUniversityIdForUser(userId: number): Promise<number> {
    return this.notificationRepository.getUniversityIdForUser(userId);
  }
}
