import { Request, Response } from "express";
import { AssignmentService } from "../services/assignment.service";

export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  public listAssignments = async (_req: Request, res: Response) => {
    const assignments = await this.assignmentService.listAssignments();
    res
      .status(200)
      .json({ message: "Assignments fetched successfully", data: assignments });
  };

  public createAssignment = async (req: Request, res: Response) => {
    const assignment = await this.assignmentService.createAssignment(req.body);
    res.status(201).json({ message: "Assignment created successfully", data: assignment });
  };

  public submitAssignment = async (req: Request, res: Response) => {
    const submission = await this.assignmentService.submitAssignment(req.body);
    res.status(201).json({ message: "Assignment submitted successfully", data: submission });
  };
}

