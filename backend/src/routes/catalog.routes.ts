import { Router } from "express";
import { CatalogController } from "../controllers/catalog.controller";
import { CatalogRepository } from "../repositories/catalog.repository";
import { CatalogService } from "../services/catalog.service";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

const controller = new CatalogController(
  new CatalogService(new CatalogRepository())
);

router.get("/programs", authenticate, asyncHandler(controller.programs));
router.get("/batches", authenticate, asyncHandler(controller.batches));
router.get("/certifications", authenticate, asyncHandler(controller.certifications));
router.get("/jobs", authenticate, asyncHandler(controller.jobs));
router.get("/exercises", authenticate, asyncHandler(controller.exercises));
router.get("/statistics", authenticate, asyncHandler(controller.statistics));

export default router;

