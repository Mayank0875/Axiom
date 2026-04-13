/**
 * controllers/quiz.controller.ts — Quiz Controller
 *
 * LAYER: Controller
 *
 * WHAT IT DOES:
 *   Handles all HTTP requests for the quiz system — listing, creating,
 *   attempting, submitting, and reviewing quizzes.
 *
 * ENDPOINTS HANDLED:
 *   GET  /quizzes                        → listQuizzes()       — all users
 *   POST /quizzes                        → createQuiz()        — faculty, admin
 *   GET  /quizzes/:quizId                → getQuizById()       — all users (with questions)
 *   GET  /quizzes/:quizId/my-attempt     → getMyAttempt()      — authenticated user
 *   POST /quizzes/:quizId/submit         → submitQuizAttempt() — authenticated user
 *   GET  /quizzes/attempts/:id/review    → getAttemptReview()  — authenticated user
 *   POST /quizzes/attempts               → attemptQuiz()       — student
 *
 * IMPORTANT — ROUTE ORDER:
 *   /attempts/:attemptId/review must be registered BEFORE /:quizId in the router.
 *   Otherwise Express matches "attempts" as the quizId param (wrong).
 *   See quiz.routes.ts for the correct ordering.
 *
 * CONNECTS TO:
 *   - services/quiz.service.ts  (all quiz business logic)
 *   - routes/quiz.routes.ts     (instantiated here)
 *   - types/express.d.ts        (req.user for getMyAttempt)
 */

import { Request, Response } from "express";
import { QuizService } from "../services/quiz.service";

export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  /** GET /quizzes — only quizzes with at least 1 question are returned */
  public listQuizzes = async (_req: Request, res: Response) => {
    const quizzes = await this.quizService.listQuizzes();
    res.status(200).json({ message: "Quizzes fetched successfully", data: quizzes });
  };

  /**
   * POST /quizzes — faculty creates a quiz
   * Side effect: enrolled students get notified automatically
   */
  public createQuiz = async (req: Request, res: Response) => {
    const quiz = await this.quizService.createQuiz(req.body);
    res.status(201).json({ message: "Quiz created successfully", data: quiz });
  };

  /** POST /quizzes/attempts — record a quiz attempt (legacy endpoint) */
  public attemptQuiz = async (req: Request, res: Response) => {
    const attempt = await this.quizService.attemptQuiz(req.body);
    res.status(201).json({ message: "Quiz attempted successfully", data: attempt });
  };

  /** GET /quizzes/:quizId — returns quiz with all its questions (for attempt page) */
  public getQuizById = async (req: Request, res: Response) => {
    const quizId = Number(req.params.quizId);
    const quiz = await this.quizService.getQuizById(quizId);
    res.status(200).json({ message: "Quiz fetched successfully", data: quiz });
  };

  /**
   * GET /quizzes/:quizId/my-attempt
   * Returns the logged-in student's latest attempt for this quiz.
   * Returns data: null if never attempted — NOT a 404.
   * Frontend uses this to decide: show "Start" or redirect to review.
   */
  public getMyAttempt = async (req: Request, res: Response) => {
    const quizId = Number(req.params.quizId);
    const studentId = req.user!.userId; // from authenticate middleware
    const attempt = await this.quizService.getStudentAttempt(quizId, studentId);
    res.status(200).json({ message: "Attempt fetched", data: attempt });
  };

  /**
   * POST /quizzes/:quizId/submit
   * Body: { studentId, answers: { questionId: selectedKey } }
   * Auto-grades the quiz, saves per-question answers, returns attempt record.
   * Returns 409 if max_attempts already reached.
   */
  public submitQuizAttempt = async (req: Request, res: Response) => {
    const quizId = Number(req.params.quizId);
    const { studentId, answers } = req.body;
    const attempt = await this.quizService.submitQuizAttempt({ quizId, studentId, answers });
    res.status(201).json({ message: "Quiz submitted successfully", data: attempt });
  };

  /**
   * GET /quizzes/attempts/:attemptId/review
   * Returns full review: each question with selected answer, correct answer, explanation.
   * Used by the review page after submission.
   */
  public getAttemptReview = async (req: Request, res: Response) => {
    const attemptId = Number(req.params.attemptId);
    const review = await this.quizService.getAttemptReview(attemptId);
    res.status(200).json({ message: "Attempt review fetched", data: review });
  };
}
