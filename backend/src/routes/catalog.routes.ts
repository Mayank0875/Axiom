/**
 * routes/catalog.routes.ts — Catalog Routes
 *
 * WHAT IT DOES:
 *   Defines read-only endpoints for catalog data.
 *   Wires: CatalogController → CatalogService → CatalogRepository.
 *
 * ALL ENDPOINTS REQUIRE AUTHENTICATION:
 *   Catalog data is internal to the university — not public.
 *   Any logged-in user (admin, faculty, student) can access these.
 *
 * ENDPOINTS:
 *   GET /api/v1/catalog/programs        → list programs
 *   GET /api/v1/catalog/batches         → list batches
 *   GET /api/v1/catalog/certifications  → list certified members
 *   GET /api/v1/catalog/jobs            → list job openings
 *   GET /api/v1/catalog/exercises       → list programming exercises
 *   GET /api/v1/catalog/statistics      → aggregate counts for dashboard
 *
 * CONNECTS TO:
 *   - controllers/catalog.controller.ts
 *   - middlewares/auth.middleware.ts
 *   - routes/index.ts (mounted at /catalog)
 */

import { Router } from "express";
import { CatalogController } from "../controllers/catalog.controller";
import { CatalogRepository } from "../repositories/catalog.repository";
import { CatalogService } from "../services/catalog.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

const controller = new CatalogController(new CatalogService(new CatalogRepository()));

router.get("/programs",       authenticate, asyncHandler(controller.programs));
router.get("/batches",        authenticate, asyncHandler(controller.batches));
router.get("/certifications", authenticate, asyncHandler(controller.certifications));
router.get("/jobs",           authenticate, asyncHandler(controller.jobs));
router.get("/exercises",      authenticate, asyncHandler(controller.exercises));
router.get("/statistics",     authenticate, asyncHandler(controller.statistics));

export default router;
