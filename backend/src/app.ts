/**
 * app.ts — Express Application Bootstrap
 *
 * WHAT IT DOES:
 *   Creates and configures the Express app: middlewares, routes, error handling.
 *
 * DESIGN PATTERN: Facade
 *   The App class hides the complexity of Express setup behind a clean interface.
 *   server.ts just does `new App()` and calls `.listen()` — it doesn't care about
 *   how middlewares or routes are wired.
 *
 * MIDDLEWARE STACK (in order):
 *   1. helmet  — sets secure HTTP headers
 *   2. cors    — allows cross-origin requests from the frontend
 *   3. json    — parses incoming JSON request bodies
 *   4. morgan  — logs every HTTP request in dev mode
 *
 * ROUTES:
 *   GET /health       — quick health check (no auth needed)
 *   /api/v1/*         — all LMS API routes (see routes/index.ts)
 *
 * ERROR HANDLING:
 *   The 4-argument error middleware at the bottom catches any error thrown
 *   inside asyncHandler. If it's an HttpError, it returns the right status code.
 *   Otherwise it logs and returns 500.
 *
 * CONNECTS TO:
 *   - routes/index.ts (mounts all sub-routers)
 *   - utils/httpError.ts (checks error type)
 *   - server.ts (creates App and starts listening)
 */

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
    this.app.use(helmet());        // security headers
    this.app.use(cors());          // allow frontend origin
    this.app.use(express.json());  // parse JSON bodies
    this.app.use(morgan("dev"));   // request logging
  }

  private initializeRoutes() {
    // Simple health check — used to verify the server is up
    this.app.get("/health", (_req, res) => {
      res.status(200).json({ message: "Axiom LMS backend is running" });
    });
    // All versioned API routes
    this.app.use("/api/v1", apiRouter);
  }

  private initializeErrorHandling() {
    // Global error handler — catches anything passed to next(err)
    // asyncHandler wraps every route handler and calls next(err) on rejection
    this.app.use(
      (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
        if (err instanceof HttpError) {
          // Known business error — return the specific status + message
          return res.status(err.statusCode).json({ message: err.message });
        }
        // Unknown error — log it and return generic 500
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    );
  }
}

export default App;
