/**
 * repositories/catalog.repository.ts — Catalog Data Access
 *
 * LAYER: Repository
 *
 * WHAT IT DOES:
 *   Read-only SQL queries for catalog data: programs, batches, certifications,
 *   job openings, programming exercises, and aggregate statistics.
 *
 * DESIGN PATTERN: Repository Pattern
 *   All SQL isolated here. CatalogService calls these methods.
 *
 * PERFORMANCE NOTE:
 *   getStatistics() runs 5 COUNT queries in parallel using Promise.all.
 *   This is faster than running them sequentially (5 round trips → 1 parallel batch).
 *
 * CONNECTS TO:
 *   - config/database.ts          (db.query)
 *   - services/catalog.service.ts (only caller)
 */

import { db } from "../config/database";

export class CatalogRepository {

  /** All programs offered by the university */
  public async listPrograms() {
    const result = await db.query(
      `SELECT id, title, description, course_count FROM programs ORDER BY id DESC`
    );
    return result.rows;
  }

  /** All batches with scheduling and capacity info */
  public async listBatches() {
    const result = await db.query(
      `SELECT id, title, status, start_date, end_date, course_count, student_count, category
       FROM batches ORDER BY id DESC`
    );
    return result.rows;
  }

  /** Certified members — shows open_to_work and hiring flags */
  public async listCertifiedMembers() {
    const result = await db.query(
      `SELECT id, name, category, open_to_work, hiring FROM certified_members ORDER BY id DESC`
    );
    return result.rows;
  }

  /** Job openings posted by the university */
  public async listJobOpenings() {
    const result = await db.query(
      `SELECT id, title, company, country, type, work_mode FROM job_openings ORDER BY id DESC`
    );
    return result.rows;
  }

  /**
   * Programming exercises — LEFT JOINs courses so course_title is included.
   * course_id can be null (exercise not linked to a specific course).
   */
  public async listProgrammingExercises() {
    const result = await db.query(
      `SELECT pe.id, pe.title, pe.language, pe.difficulty, pe.updated_on,
              pe.course_id, c.title AS course_title
       FROM programming_exercises pe
       LEFT JOIN courses c ON c.id = pe.course_id
       ORDER BY pe.id DESC`
    );
    return result.rows;
  }

  /**
   * Aggregate statistics for the dashboard.
   * Runs all 5 COUNT queries in parallel — much faster than sequential.
   */
  public async getStatistics() {
    const [courses, signups, enrollments, completions, certifications] = await Promise.all([
      db.query("SELECT COUNT(*)::int AS value FROM courses"),
      db.query("SELECT COUNT(*)::int AS value FROM users"),
      db.query("SELECT COUNT(*)::int AS value FROM enrollment"),
      db.query("SELECT COUNT(*)::int AS value FROM enrollment WHERE status = 'completed'"),
      db.query("SELECT COUNT(*)::int AS value FROM certified_members"),
    ]);

    return {
      courses:        courses.rows[0].value,
      signups:        signups.rows[0].value,
      enrollments:    enrollments.rows[0].value,
      completions:    completions.rows[0].value,
      certifications: certifications.rows[0].value,
    };
  }
}
