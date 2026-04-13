/**
 * models/quiz.model.ts — Quiz Domain Model
 *
 * WHAT IT DOES:
 *   Represents a quiz created by faculty for a course.
 *
 * QUIZ FLOW:
 *   Faculty creates quiz → adds questions → students attempt → system auto-grades
 *   → student sees score + per-question review with explanations
 *
 * CONNECTS TO:
 *   - repositories/quiz.repository.ts (used in create())
 *   - services/quiz.service.ts (instantiated before DB insert)
 *
 * DB TABLE: quizzes
 *   Related tables: quiz_questions, quiz_attempts, quiz_attempt_answers
 */

export class Quiz {
  constructor(
    public readonly id: number | null,    // null before insert
    public readonly courseId: number,     // FK → courses.id
    public readonly title: string,
    public readonly description: string,
    public readonly maxAttempts: number,  // how many times a student can attempt
    public readonly totalMarks: number    // sum of all question marks
  ) {}
}
