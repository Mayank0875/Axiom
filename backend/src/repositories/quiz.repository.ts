import { db } from "../config/database";
import { Quiz } from "../models/quiz.model";

type QuizAttemptInput = {
  quizId: number;
  studentId: number;
  score: number;
  status: "in_progress" | "submitted" | "evaluated";
};

export class QuizRepository {
  public async list() {
    const query = `
      SELECT id, course_id, title, description, max_attempts, total_marks, created_at
      FROM quizzes
      ORDER BY id DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  public async create(quiz: Quiz, createdBy: number) {
    const query = `
      INSERT INTO quizzes (course_id, title, description, max_attempts, total_marks, created_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, course_id, title, description, max_attempts, total_marks
    `;

    const result = await db.query<Quiz>(query, [
      quiz.courseId,
      quiz.title,
      quiz.description,
      quiz.maxAttempts,
      quiz.totalMarks,
      createdBy,
    ]);

    return result.rows[0];
  }

  public async createAttempt(input: QuizAttemptInput) {
    const attemptNumberQuery = `
      SELECT COALESCE(MAX(attempt_number), 0) + 1 AS attempt_number
      FROM quiz_attempts
      WHERE quiz_id = $1 AND student_id = $2
    `;
    const attemptNumberResult = await db.query<{ attempt_number: number }>(
      attemptNumberQuery,
      [input.quizId, input.studentId]
    );
    const attemptNumber = attemptNumberResult.rows[0].attempt_number;

    const query = `
      INSERT INTO quiz_attempts (quiz_id, student_id, score, attempt_number, started_at, submitted_at, status)
      VALUES ($1, $2, $3, $4, NOW(), NOW(), $5::quiz_attempt_status)
      RETURNING id, quiz_id, student_id, score, attempt_number, status
    `;

    const result = await db.query(query, [
      input.quizId,
      input.studentId,
      input.score,
      attemptNumber,
      input.status,
    ]);

    return result.rows[0];
  }

  public async getByIdWithQuestions(quizId: number) {
    const quizResult = await db.query(
      `SELECT id, course_id, title, description, max_attempts, total_marks, created_at
       FROM quizzes
       WHERE id = $1`,
      [quizId]
    );
    const quiz = quizResult.rows[0];
    if (!quiz) return null;

    const questionsResult = await db.query(
      `SELECT id, question_text, options, correct_answer, marks
       FROM quiz_questions
       WHERE quiz_id = $1
       ORDER BY id`,
      [quizId]
    );

    return {
      ...quiz,
      questions: questionsResult.rows.map((q) => {
        const options = Array.isArray(q.options) ? q.options : [];
        return {
          id: q.id,
          question: q.question_text,
          options,
          correctKey: q.correct_answer?.key ?? null,
          explanation: q.correct_answer?.explanation ?? "",
          marks: q.marks ?? 0,
        };
      }),
    };
  }

  public async submitAttemptWithAnswers(input: {
    quizId: number;
    studentId: number;
    answers: Record<string, string>;
  }) {
    const quiz = await this.getByIdWithQuestions(input.quizId);
    if (!quiz) return null;

    const attemptNumberQuery = `
      SELECT COALESCE(MAX(attempt_number), 0) + 1 AS attempt_number
      FROM quiz_attempts
      WHERE quiz_id = $1 AND student_id = $2
    `;
    const attemptNumberResult = await db.query<{ attempt_number: number }>(
      attemptNumberQuery,
      [input.quizId, input.studentId]
    );
    const attemptNumber = attemptNumberResult.rows[0].attempt_number;

    let score = 0;
    for (const question of quiz.questions) {
      const selected = input.answers[String(question.id)];
      if (selected && selected === question.correctKey) {
        score += question.marks;
      }
    }

    const attemptResult = await db.query(
      `INSERT INTO quiz_attempts (quiz_id, student_id, score, attempt_number, started_at, submitted_at, status)
       VALUES ($1, $2, $3, $4, NOW(), NOW(), 'submitted')
       RETURNING id, quiz_id, student_id, score, attempt_number, status`,
      [input.quizId, input.studentId, score, attemptNumber]
    );
    const attempt = attemptResult.rows[0];

    for (const question of quiz.questions) {
      const selected = input.answers[String(question.id)] ?? null;
      const isCorrect = selected !== null && selected === question.correctKey;
      await db.query(
        `INSERT INTO quiz_attempt_answers (quiz_attempt_id, question_id, selected_option, is_correct)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (quiz_attempt_id, question_id) DO NOTHING`,
        [attempt.id, question.id, selected, isCorrect]
      );
    }

    return attempt;
  }

  public async getAttemptReview(attemptId: number) {
    const attemptResult = await db.query(
      `SELECT qa.id, qa.quiz_id, qa.student_id, qa.score, qa.status, q.title
       FROM quiz_attempts qa
       JOIN quizzes q ON q.id = qa.quiz_id
       WHERE qa.id = $1`,
      [attemptId]
    );
    const attempt = attemptResult.rows[0];
    if (!attempt) return null;

    const answers = await db.query(
      `SELECT
        qq.id AS question_id,
        qq.question_text,
        qq.options,
        qq.correct_answer,
        qq.marks,
        qaa.selected_option,
        qaa.is_correct
      FROM quiz_attempt_answers qaa
      JOIN quiz_questions qq ON qq.id = qaa.question_id
      WHERE qaa.quiz_attempt_id = $1
      ORDER BY qq.id`,
      [attemptId]
    );

    return {
      ...attempt,
      questions: answers.rows.map((row) => ({
        id: row.question_id,
        question: row.question_text,
        options: row.options,
        correctKey: row.correct_answer?.key ?? null,
        explanation: row.correct_answer?.explanation ?? "",
        selectedKey: row.selected_option,
        isCorrect: row.is_correct,
        marks: row.marks ?? 0,
      })),
    };
  }
}

