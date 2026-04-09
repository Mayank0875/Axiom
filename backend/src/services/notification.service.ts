import { Notification } from "../models/notification.model";
import { NotificationRepository } from "../repositories/notification.repository";

export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  public async createNotification(input: {
    universityId: number;
    userId: number;
    title: string;
    message: string;
  }) {
    const notification = new Notification(
      null,
      input.universityId,
      input.userId,
      input.title,
      input.message
    );
    return this.notificationRepository.create(notification);
  }

  public async getUserNotifications(userId: number) {
    return this.notificationRepository.getByUser(userId);
  }
}

