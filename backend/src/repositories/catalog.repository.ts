import { db } from "../config/database";

export class CatalogRepository {
  public async listPrograms() {
    const result = await db.query(
      "SELECT id, title, description, course_count FROM programs ORDER BY id DESC"
    );
    return result.rows;
  }

  public async listBatches() {
    const result = await db.query(
      `SELECT id, title, status, start_date, end_date, course_count, student_count, category
       FROM batches
       ORDER BY id DESC`
    );
    return result.rows;
  }

  public async listCertifiedMembers() {
    const result = await db.query(
      `SELECT id, name, category, open_to_work, hiring
       FROM certified_members
       ORDER BY id DESC`
    );
    return result.rows;
  }

  public async listJobOpenings() {
    const result = await db.query(
      `SELECT id, title, company, country, type, work_mode
       FROM job_openings
       ORDER BY id DESC`
    );
    return result.rows;
  }

  public async listProgrammingExercises() {
    const result = await db.query(
      `SELECT pe.id, pe.title, pe.language, pe.difficulty, pe.updated_on, pe.course_id, c.title AS course_title
       FROM programming_exercises pe
       LEFT JOIN courses c ON c.id = pe.course_id
       ORDER BY pe.id DESC`
    );
    return result.rows;
  }

  public async getStatistics() {
    const [courses, signups, enrollments, completions, certifications] = await Promise.all([
      db.query("SELECT COUNT(*)::int AS value FROM courses"),
      db.query("SELECT COUNT(*)::int AS value FROM users"),
      db.query("SELECT COUNT(*)::int AS value FROM enrollment"),
      db.query("SELECT COUNT(*)::int AS value FROM enrollment WHERE status = 'completed'"),
      db.query("SELECT COUNT(*)::int AS value FROM certified_members"),
    ]);

    return {
      courses: courses.rows[0].value,
      signups: signups.rows[0].value,
      enrollments: enrollments.rows[0].value,
      completions: completions.rows[0].value,
      certifications: certifications.rows[0].value,
    };
  }
}

