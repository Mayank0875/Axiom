import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationService } from "../services/notification.service";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

const notificationController = new NotificationController(
  new NotificationService(new NotificationRepository())
);

router.post("/", asyncHandler(notificationController.createNotification));
router.get("/user/:userId", asyncHandler(notificationController.getUserNotifications));

export default router;

