/**
 * controllers/assignment.controller.ts — Assignment Controller
 *
 * LAYER: Controller
 *
 * WHAT IT DOES:
 *   Handles HTTP requests for assignment management and student submissions.
 *
 * ENDPOINTS HANDLED:
 *   GET  /assignments             → listAssignments()   — all authenticated users
 *   POST /assignments             → createAssignment()  — faculty only
 *   POST /assignments/submissions → submitAssignment()  — student only
 *
 * SIDE EFFECT ON CREATE:
 *   When faculty creates an assignment, AssignmentService automatically
 *   sends notifications to all enrolled students (fire-and-forget).
 *   The controller doesn't need to know about this — it's handled in the service.
 *
 * CONNECTS TO:
 *   - services/assignment.service.ts  (business logic + notification trigger)
 *   - routes/assignment.routes.ts     (instantiated here)
 */

import { Request, Response } from "express";
import { AssignmentService } from "../services/assignment.service";

export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  /** GET /assignments — returns all assignments ordered by newest first */
  public listAssignments = async (_req: Request, res: Response) => {
    const assignments = await this.assignmentService.listAssignments();
    res.status(200).json({ message: "Assignments fetched successfully", data: assignments });
  };

  /**
   * POST /assignments — faculty creates a new assignment
   * Body: { courseId, title, description, deadline, maxMarks, assignmentType }
   * Side effect: enrolled students get notified automatically
   */
  public createAssignment = async (req: Request, res: Response) => {
    const assignment = await this.assignmentService.createAssignment(req.body);
    res.status(201).json({ message: "Assignment created successfully", data: assignment });
  };

  /**
   * POST /assignments/submissions — student submits their work
   * Body: { assignmentId, studentId, textSubmission?, fileUrl? }
   * Note: re-submitting updates the existing record (upsert)
   */
  public submitAssignment = async (req: Request, res: Response) => {
    const submission = await this.assignmentService.submitAssignment(req.body);
    res.status(201).json({ message: "Assignment submitted successfully", data: submission });
  };
}
