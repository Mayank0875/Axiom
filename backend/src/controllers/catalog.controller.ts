import { Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";

export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  public programs = async (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Programs fetched successfully",
      data: await this.catalogService.listPrograms(),
    });
  };

  public batches = async (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Batches fetched successfully",
      data: await this.catalogService.listBatches(),
    });
  };

  public certifications = async (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Certifications fetched successfully",
      data: await this.catalogService.listCertifications(),
    });
  };

  public jobs = async (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Jobs fetched successfully",
      data: await this.catalogService.listJobs(),
    });
  };

  public exercises = async (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Exercises fetched successfully",
      data: await this.catalogService.listExercises(),
    });
  };

  public statistics = async (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Statistics fetched successfully",
      data: await this.catalogService.getStatistics(),
    });
  };
}

