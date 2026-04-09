import { Router } from "express";
import { LectureController } from "../controllers/lecture.controller";
import { LectureRepository } from "../repositories/lecture.repository";
import { LectureService } from "../services/lecture.service";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

const lectureController = new LectureController(
  new LectureService(new LectureRepository())
);

router.post("/", asyncHandler(lectureController.addLecture));

export default router;

