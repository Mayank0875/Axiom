import { Lecture } from "../models/lecture.model";
import { LectureRepository } from "../repositories/lecture.repository";

export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) {}

  public async addLecture(input: {
    courseId: number;
    title: string;
    description: string;
    videoUrl: string;
  }) {
    const lecture = new Lecture(
      null,
      input.courseId,
      input.title,
      input.description,
      input.videoUrl
    );
    return this.lectureRepository.create(lecture);
  }
}

