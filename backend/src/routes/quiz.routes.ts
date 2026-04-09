import { Router } from "express";
import { QuizController } from "../controllers/quiz.controller";
import { QuizRepository } from "../repositories/quiz.repository";
import { QuizService } from "../services/quiz.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

const quizController = new QuizController(new QuizService(new QuizRepository()));

router.get("/", authenticate, asyncHandler(quizController.listQuizzes));
router.get("/:quizId", authenticate, asyncHandler(quizController.getQuizById));
router.post(
  "/",
  authenticate,
  requireRole("faculty", "admin"),
  asyncHandler(quizController.createQuiz)
);
router.post(
  "/:quizId/submit",
  authenticate,
  requireRole("student", "admin", "faculty"),
  asyncHandler(quizController.submitQuizAttempt)
);
router.get(
  "/attempts/:attemptId/review",
  authenticate,
  asyncHandler(quizController.getAttemptReview)
);
router.post(
  "/attempts",
  authenticate,
  requireRole("student"),
  asyncHandler(quizController.attemptQuiz)
);

export default router;

