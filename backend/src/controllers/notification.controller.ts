/**
 * controllers/notification.controller.ts — Notification Controller
 *
 * LAYER: Controller
 *
 * WHAT IT DOES:
 *   Handles HTTP requests for the notification system.
 *   Students see their own notifications; admin/faculty see all.
 *
 * ENDPOINTS HANDLED:
 *   POST /notifications              → createNotification()    — manual creation
 *   GET  /notifications/user/:userId → getUserNotifications()  — student's own
 *   GET  /notifications/all          → getAllNotifications()   — admin/faculty only
 *
 * HOW getAllNotifications WORKS:
 *   It reads req.user.userId (set by authenticate middleware),
 *   looks up that user's university_id, then returns ALL notifications
 *   for that university — so admins/faculty see everything in their org.
 *
 * NOTE ON AUTO-NOTIFICATIONS:
 *   Most notifications are created automatically when assignments/quizzes
 *   are posted (see assignment.service.ts and quiz.service.ts).
 *   This controller handles manual creation and retrieval only.
 *
 * CONNECTS TO:
 *   - services/notification.service.ts  (business logic)
 *   - routes/notification.routes.ts     (instantiated here)
 *   - types/express.d.ts                (req.user)
 */

import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * POST /notifications — manually create a notification for a specific user
   * Body: { universityId, userId, title, message }
   */
  public createNotification = async (req: Request, res: Response) => {
    const notification = await this.notificationService.createNotification(req.body);
    res.status(201).json({ message: "Notification created successfully", data: notification });
  };

  /**
   * GET /notifications/user/:userId — get all notifications for a specific user
   * Ordered by newest first. Used by the student notifications page.
   */
  public getUserNotifications = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const notifications = await this.notificationService.getUserNotifications(userId);
    res.status(200).json({ message: "Notifications fetched successfully", data: notifications });
  };

  /**
   * GET /notifications/all — admin/faculty view of ALL notifications in their university
   * Includes recipient name, email, roles, read status.
   * University is auto-detected from the logged-in user's profile.
   */
  public getAllNotifications = async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    // Resolve which university this admin/faculty belongs to
    const universityId = await this.notificationService.getUniversityIdForUser(userId);
    const notifications = await this.notificationService.getAllNotifications(universityId);
    res.status(200).json({ message: "All notifications fetched successfully", data: notifications });
  };
}
