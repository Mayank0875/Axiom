import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  public createNotification = async (req: Request, res: Response) => {
    const notification = await this.notificationService.createNotification(req.body);
    res.status(201).json({
      message: "Notification created successfully",
      data: notification,
    });
  };

  public getUserNotifications = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const notifications = await this.notificationService.getUserNotifications(userId);
    res.status(200).json({
      message: "Notifications fetched successfully",
      data: notifications,
    });
  };
}

