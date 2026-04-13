/**
 * services/quiz.service.ts — Quiz Business Logic
 *
 * WHAT IT DOES:
 *   Manages quiz creation, retrieval, attempt tracking, submission, and review.
 *   Also triggers automatic notifications to enrolled students when a quiz is created.
 *
 * DESIGN PATTERN: Service Layer + Observer (fire-and-forget notification)
 *   Business rules (max attempts, quiz existence) live here.
 *   The notification side-effect is fire-and-forget — it won't fail the main operation
 *   if the notification system has an issue.
 *
 * DEPENDENCY INJECTION:
 *   Both QuizRepository and NotificationRepository are injected via constructor.
 *   This keeps the service testable and follows the Dependency Inversion Principle.
 *
 * KEY RULES:
 *   - A quiz must have at least 1 question to appear in the list
 *   - A student cannot exceed max_attempts for a quiz (enforced in repository)
 *   - Submitting auto-calculates score by comparing answers to correct_answer
 *
 * CONNECTS TO:
 *   - repositories/quiz.repository.ts (all quiz DB operations)
 *   - repositories/notification.repository.ts (bulk notify students)
 *   - utils/httpError.ts (throws on not found / max attempts)
 *   - controllers/quiz.controller.ts (called by all quiz handlers)
 */

import { Quiz } from "../models/quiz.model";
import { QuizRepository } from "../repositories/quiz.repository";
import { NotificationRepository } from "../repositories/notification.repository";
import { HttpError } from "../utils/httpError";

export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly notificationRepository: NotificationRepository
  ) {}

  /** Returns only quizzes that have at least one question */
  public async listQuizzes() {
    return this.quizRepository.list();
  }

  /** Create a quiz and notify all enrolled students (fire-and-forget) */
  public async createQuiz(input: {
    courseId: number;
    title: string;
    description: string;
    maxAttempts: number;
    totalMarks: number;
    createdBy: number;
  }) {
    const quiz = new Quiz(null, input.courseId, input.title, input.description, input.maxAttempts, input.totalMarks);
    const created = await this.quizRepository.create(quiz, input.createdBy);

    // Notify students — fire-and-forget so a notification failure doesn't break quiz creation
    this.notifyStudents(input.courseId, created.title).catch(() => {});

    return created;
  }

  public async attemptQuiz(input: { quizId: number; studentId: number; score: number }) {
    return this.quizRepository.createAttempt({ ...input, status: "submitted" });
  }

  /** Get quiz with all its questions — used by the attempt page */
  public async getQuizById(quizId: number) {
    const quiz = await this.quizRepository.getByIdWithQuestions(quizId);
    if (!quiz) throw new HttpError(404, "Quiz not found");
    return quiz;
  }

  /** Check if a student has already attempted this quiz */
  public async getStudentAttempt(quizId: number, studentId: number) {
    return this.quizRepository.getStudentAttempt(quizId, studentId);
  }

  /** Submit answers — auto-grades and saves per-question results */
  public async submitQuizAttempt(input: {
    quizId: number;
    studentId: number;
    answers: Record<string, string>;
  }) {
    try {
      const attempt = await this.quizRepository.submitAttemptWithAnswers(input);
      if (!attempt) throw new HttpError(404, "Quiz not found");
      return attempt;
    } catch (err) {
      // Repository throws this sentinel string when max attempts exceeded
      if (err instanceof Error && err.message === "MAX_ATTEMPTS_REACHED") {
        throw new HttpError(409, "You have already used all attempts for this quiz.");
      }
      throw err;
    }
  }

  /** Get full review: questions, selected answers, correct answers, explanations */
  public async getAttemptReview(attemptId: number) {
    const review = await this.quizRepository.getAttemptReview(attemptId);
    if (!review) throw new HttpError(404, "Attempt not found");
    return review;
  }

  /** Private: notify all students enrolled in the course about the new quiz */
  private async notifyStudents(courseId: number, title: string) {
    const universityId = await this.notificationRepository.getUniversityIdByCourse(courseId);
    if (!universityId) return;

    const studentIds = await this.notificationRepository.getStudentIdsByCourse(courseId);
    if (!studentIds.length) return;

    await this.notificationRepository.bulkCreate(
      universityId,
      studentIds,
      `New Quiz: ${title}`,
      `A new quiz "${title}" is now available. Attempt it before the deadline closes.`
    );
  }
}
