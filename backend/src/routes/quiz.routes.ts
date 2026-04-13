/**
 * routes/quiz.routes.ts — Quiz Routes
 *
 * WHAT IT DOES:
 *   Defines all quiz endpoints: listing, creating, attempting, submitting, reviewing.
 *   Wires: QuizController → QuizService → QuizRepository + NotificationRepository.
 *
 * CRITICAL ROUTE ORDER — READ THIS:
 *   Express matches routes top-to-bottom. Static paths must come before param paths.
 *
 *   WRONG order:
 *     GET /:quizId                    ← matches EVERYTHING including "attempts"
 *     GET /attempts/:attemptId/review ← NEVER reached
 *
 *   CORRECT order (this file):
 *     GET /attempts/:attemptId/review ← registered first (static prefix)
 *     GET /:quizId                    ← registered after
 *
 *   Same applies to /:quizId/my-attempt — must come after /attempts/... routes.
 *
 * ENDPOINTS:
 *   GET  /api/v1/quizzes                          → list quizzes (with questions only)
 *   GET  /api/v1/quizzes/attempts/:id/review      → get attempt review
 *   POST /api/v1/quizzes/attempts                 → create attempt (legacy)
 *   GET  /api/v1/quizzes/:quizId                  → get quiz with questions
 *   GET  /api/v1/quizzes/:quizId/my-attempt       → check if student attempted
 *   POST /api/v1/quizzes                          → create quiz (notifies students)
 *   POST /api/v1/quizzes/:quizId/submit           → submit answers (auto-graded)
 *
 * CONNECTS TO:
 *   - controllers/quiz.controller.ts
 *   - services/quiz.service.ts
 *   - repositories/quiz.repository.ts
 *   - repositories/notification.repository.ts (for auto-notifications)
 *   - middlewares/auth.middleware.ts
 *   - middlewares/role.middleware.ts
 *   - routes/index.ts (mounted at /quizzes)
 */

import { Router } from "express";
import { QuizController } from "../controllers/quiz.controller";
import { QuizRepository } from "../repositories/quiz.repository";
import { QuizService } from "../services/quiz.service";
import { NotificationRepository } from "../repositories/notification.repository";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Inject both repositories — QuizService needs NotificationRepository for auto-notify
const quizController = new QuizController(
  new QuizService(new QuizRepository(), new NotificationRepository())
);

// ── Static prefix routes FIRST (before any /:param routes) ──────────────────
router.get("/",                          authenticate, asyncHandler(quizController.listQuizzes));
router.get("/attempts/:attemptId/review",authenticate, asyncHandler(quizController.getAttemptReview));
router.post("/attempts",                 authenticate, requireRole("student"), asyncHandler(quizController.attemptQuiz));

// ── Param routes AFTER static routes ────────────────────────────────────────
router.get("/:quizId",            authenticate, asyncHandler(quizController.getQuizById));
router.get("/:quizId/my-attempt", authenticate, asyncHandler(quizController.getMyAttempt));
router.post("/",                  authenticate, requireRole("faculty", "admin"), asyncHandler(quizController.createQuiz));
router.post("/:quizId/submit",    authenticate, asyncHandler(quizController.submitQuizAttempt));

export default router;
