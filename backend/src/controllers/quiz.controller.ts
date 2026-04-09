import { Request, Response } from "express";
import { QuizService } from "../services/quiz.service";

export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  public listQuizzes = async (_req: Request, res: Response) => {
    const quizzes = await this.quizService.listQuizzes();
    res.status(200).json({ message: "Quizzes fetched successfully", data: quizzes });
  };

  public createQuiz = async (req: Request, res: Response) => {
    const quiz = await this.quizService.createQuiz(req.body);
    res.status(201).json({ message: "Quiz created successfully", data: quiz });
  };

  public attemptQuiz = async (req: Request, res: Response) => {
    const attempt = await this.quizService.attemptQuiz(req.body);
    res.status(201).json({ message: "Quiz attempted successfully", data: attempt });
  };

  public getQuizById = async (req: Request, res: Response) => {
    const quizId = Number(req.params.quizId);
    const quiz = await this.quizService.getQuizById(quizId);
    res.status(200).json({ message: "Quiz fetched successfully", data: quiz });
  };

  public submitQuizAttempt = async (req: Request, res: Response) => {
    const quizId = Number(req.params.quizId);
    const { studentId, answers } = req.body;
    const attempt = await this.quizService.submitQuizAttempt({
      quizId,
      studentId,
      answers,
    });
    res.status(201).json({
      message: "Quiz submitted successfully",
      data: attempt,
    });
  };

  public getAttemptReview = async (req: Request, res: Response) => {
    const attemptId = Number(req.params.attemptId);
    const review = await this.quizService.getAttemptReview(attemptId);
    res.status(200).json({ message: "Attempt review fetched", data: review });
  };
}

