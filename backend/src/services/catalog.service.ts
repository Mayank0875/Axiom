/**
 * services/catalog.service.ts — Catalog Business Logic
 *
 * LAYER: Service
 *
 * WHAT IT DOES:
 *   Provides read-only access to catalog data: programs, batches,
 *   certifications, job openings, programming exercises, and statistics.
 *
 * WHY SO THIN:
 *   Catalog endpoints are pure reads with no business rules.
 *   The service layer still exists here for consistency — if filtering,
 *   pagination, or access control is added later, it goes here.
 *
 * DESIGN PATTERN: Service Layer (thin pass-through)
 *   Even when there's no logic, keeping the layer means the controller
 *   never imports the repository directly. The architecture stays consistent.
 *
 * CONNECTS TO:
 *   - repositories/catalog.repository.ts  (all SQL queries)
 *   - controllers/catalog.controller.ts   (called by all catalog handlers)
 */

import { CatalogRepository } from "../repositories/catalog.repository";

export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  /** List all programs offered by the university */
  public listPrograms() {
    return this.catalogRepository.listPrograms();
  }

  /** List all batches with start/end dates and student counts */
  public listBatches() {
    return this.catalogRepository.listBatches();
  }

  /** List certified members (open to work, hiring status) */
  public listCertifications() {
    return this.catalogRepository.listCertifiedMembers();
  }

  /** List job openings posted by the university */
  public listJobs() {
    return this.catalogRepository.listJobOpenings();
  }

  /** List programming exercises with language, difficulty, and linked course */
  public listExercises() {
    return this.catalogRepository.listProgrammingExercises();
  }

  /**
   * Get aggregate statistics for the dashboard.
   * Runs 5 COUNT queries in parallel for performance.
   */
  public getStatistics() {
    return this.catalogRepository.getStatistics();
  }
}
