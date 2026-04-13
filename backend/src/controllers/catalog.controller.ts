/**
 * controllers/catalog.controller.ts — Catalog Controller
 *
 * LAYER: Controller
 *
 * WHAT IT DOES:
 *   Handles HTTP requests for read-only catalog data — programs, batches,
 *   certifications, job openings, programming exercises, and statistics.
 *
 * WHY A SEPARATE "CATALOG" MODULE:
 *   These are informational/listing endpoints that don't belong to a specific
 *   user action (like submitting or enrolling). Grouping them under /catalog
 *   keeps the API clean and the code organized.
 *
 * ENDPOINTS HANDLED:
 *   GET /catalog/programs        → programs()
 *   GET /catalog/batches         → batches()
 *   GET /catalog/certifications  → certifications()
 *   GET /catalog/jobs            → jobs()
 *   GET /catalog/exercises       → exercises()
 *   GET /catalog/statistics      → statistics()
 *
 * CONNECTS TO:
 *   - services/catalog.service.ts  (delegates to repository)
 *   - routes/catalog.routes.ts     (instantiated here)
 */

import { Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";

export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  /** GET /catalog/programs — list all programs offered by the university */
  public programs = async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Programs fetched successfully", data: await this.catalogService.listPrograms() });
  };

  /** GET /catalog/batches — list all batches with dates and student counts */
  public batches = async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Batches fetched successfully", data: await this.catalogService.listBatches() });
  };

  /** GET /catalog/certifications — list certified members */
  public certifications = async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Certifications fetched successfully", data: await this.catalogService.listCertifications() });
  };

  /** GET /catalog/jobs — list job openings posted by the university */
  public jobs = async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Jobs fetched successfully", data: await this.catalogService.listJobs() });
  };

  /** GET /catalog/exercises — list programming exercises with language and difficulty */
  public exercises = async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Exercises fetched successfully", data: await this.catalogService.listExercises() });
  };

  /**
   * GET /catalog/statistics — aggregate counts for the dashboard
   * Returns: { courses, signups, enrollments, completions, certifications }
   */
  public statistics = async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Statistics fetched successfully", data: await this.catalogService.getStatistics() });
  };
}
