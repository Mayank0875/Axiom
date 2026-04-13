/**
 * models/lecture.model.ts — Lecture Domain Model
 *
 * WHAT IT DOES:
 *   Represents a single lecture (video lesson) inside a course.
 *
 * CONNECTS TO:
 *   - repositories/lecture.repository.ts (used in create())
 *   - services/lecture.service.ts (instantiated before DB insert)
 *
 * DB TABLE: lectures
 *   A lecture belongs to a course. It has a video URL and description.
 */

export class Lecture {
  constructor(
    public readonly id: number | null,   // null before insert
    public readonly courseId: number,    // FK → courses.id
    public readonly title: string,
    public readonly description: string,
    public readonly videoUrl: string     // link to the lecture video
  ) {}
}
