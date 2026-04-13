/**
 * routes/index.ts — API Gateway / Route Aggregator
 *
 * WHAT IT DOES:
 *   Mounts all module routers under a single Express Router.
 *   This router is then mounted at /api/v1 in app.ts.
 *
 * DESIGN PATTERN: API Gateway (Front Controller)
 *   One entry point for all API routes. Adding a new module means
 *   adding one line here — nothing else changes.
 *
 * ROUTE MAP:
 *   /api/v1/auth          → auth.routes.ts      (register, login)
 *   /api/v1/users         → user.routes.ts      (profile, admin user mgmt)
 *   /api/v1/courses       → course.routes.ts    (CRUD, enroll, assign faculty)
 *   /api/v1/lectures      → lecture.routes.ts   (add lecture to course)
 *   /api/v1/assignments   → assignment.routes.ts(create, submit)
 *   /api/v1/quizzes       → quiz.routes.ts      (create, attempt, review)
 *   /api/v1/notifications → notification.routes.ts (user + admin view)
 *   /api/v1/catalog       → catalog.routes.ts   (programs, batches, jobs, etc.)
 *
 * CONNECTS TO:
 *   - app.ts (this router is mounted at /api/v1)
 *   - All route files in this directory
 */

import { Router } from "express";
import userRoutes         from "./user.routes";
import authRoutes         from "./auth.routes";
import courseRoutes       from "./course.routes";
import lectureRoutes      from "./lecture.routes";
import assignmentRoutes   from "./assignment.routes";
import quizRoutes         from "./quiz.routes";
import notificationRoutes from "./notification.routes";
import catalogRoutes      from "./catalog.routes";

const apiRouter = Router();

apiRouter.use("/users",         userRoutes);
apiRouter.use("/auth",          authRoutes);
apiRouter.use("/courses",       courseRoutes);
apiRouter.use("/lectures",      lectureRoutes);
apiRouter.use("/assignments",   assignmentRoutes);
apiRouter.use("/quizzes",       quizRoutes);
apiRouter.use("/notifications", notificationRoutes);
apiRouter.use("/catalog",       catalogRoutes);

export default apiRouter;
