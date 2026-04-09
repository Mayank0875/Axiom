import { Quiz } from "../models/quiz.model";
import { QuizRepository } from "../repositories/quiz.repository";
import { HttpError } from "../utils/httpError";

export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  public async listQuizzes() {
    return this.quizRepository.list();
  }

  public async createQuiz(input: {
    courseId: number;
    title: string;
    description: string;
    maxAttempts: number;
    totalMarks: number;
    createdBy: number;
  }) {
    const quiz = new Quiz(
      null,
      input.courseId,
      input.title,
      input.description,
      input.maxAttempts,
      input.totalMarks
    );
    return this.quizRepository.create(quiz, input.createdBy);
  }

  public async attemptQuiz(input: {
    quizId: number;
    studentId: number;
    score: number;
  }) {
    return this.quizRepository.createAttempt({
      quizId: input.quizId,
      studentId: input.studentId,
      score: input.score,
      status: "submitted",
    });
  }

  public async getQuizById(quizId: number) {
    const quiz = await this.quizRepository.getByIdWithQuestions(quizId);
    if (!quiz) throw new HttpError(404, "Quiz not found");
    return quiz;
  }

  public async submitQuizAttempt(input: {
    quizId: number;
    studentId: number;
    answers: Record<string, string>;
  }) {
    const attempt = await this.quizRepository.submitAttemptWithAnswers(input);
    if (!attempt) throw new HttpError(404, "Quiz not found");
    return attempt;
  }

  public async getAttemptReview(attemptId: number) {
    const review = await this.quizRepository.getAttemptReview(attemptId);
    if (!review) throw new HttpError(404, "Attempt not found");
    return review;
  }
}

