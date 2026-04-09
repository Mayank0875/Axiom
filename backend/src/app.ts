import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiRouter from "./routes";
import { HttpError } from "./utils/httpError";

class App {
  public readonly app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  private initializeRoutes() {
    this.app.get("/health", (_req, res) => {
      res.status(200).json({ message: "Axiom LMS backend is running" });
    });
    this.app.use("/api/v1", apiRouter);
  }

  private initializeErrorHandling() {
    this.app.use(
      (
        err: unknown,
        _req: Request,
        res: Response,
        _next: NextFunction
      ) => {
        if (err instanceof HttpError) {
          return res.status(err.statusCode).json({ message: err.message });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    );
  }
}

export default App;
