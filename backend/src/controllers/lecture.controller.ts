import { Request, Response } from "express";
import { LectureService } from "../services/lecture.service";

export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  public addLecture = async (req: Request, res: Response) => {
    const lecture = await this.lectureService.addLecture(req.body);
    res.status(201).json({ message: "Lecture added successfully", data: lecture });
  };
}

