import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import courseRoutes from "./course.routes";
import lectureRoutes from "./lecture.routes";
import assignmentRoutes from "./assignment.routes";
import quizRoutes from "./quiz.routes";
import notificationRoutes from "./notification.routes";
import catalogRoutes from "./catalog.routes";

const apiRouter = Router();

// API Gateway-style routing for v1 endpoints.
apiRouter.use("/users", userRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/courses", courseRoutes);
apiRouter.use("/lectures", lectureRoutes);
apiRouter.use("/assignments", assignmentRoutes);
apiRouter.use("/quizzes", quizRoutes);
apiRouter.use("/notifications", notificationRoutes);
apiRouter.use("/catalog", catalogRoutes);

export default apiRouter;

