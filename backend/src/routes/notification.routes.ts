/**
 * routes/notification.routes.ts — Notification Routes
 *
 * WHAT IT DOES:
 *   Defines endpoints for the notification system.
 *   Wires: NotificationController → NotificationService → NotificationRepository.
 *
 * ROUTE ORDER NOTE:
 *   GET /all must come before GET /user/:userId.
 *   Otherwise "all" would be treated as a userId param.
 *
 * ROLE PROTECTION:
 *   GET /all          → admin or faculty only (see all notifications in their university)
 *   POST /            → public (manual notification creation)
 *   GET /user/:userId → public (student fetches own notifications)
 *
 * ENDPOINTS:
 *   GET  /api/v1/notifications/all          → all notifications (admin/faculty)
 *   POST /api/v1/notifications              → create a notification manually
 *   GET  /api/v1/notifications/user/:userId → get notifications for a user
 *
 * CONNECTS TO:
 *   - controllers/notification.controller.ts
 *   - middlewares/auth.middleware.ts
 *   - middlewares/role.middleware.ts
 *   - routes/index.ts (mounted at /notifications)
 */

import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationService } from "../services/notification.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

const notificationController = new NotificationController(
  new NotificationService(new NotificationRepository())
);

// Static route first — must be before /user/:userId
router.get("/all", authenticate, requireRole("admin", "faculty"), asyncHandler(notificationController.getAllNotifications));

router.post("/",              asyncHandler(notificationController.createNotification));
router.get("/user/:userId",   asyncHandler(notificationController.getUserNotifications));

export default router;
