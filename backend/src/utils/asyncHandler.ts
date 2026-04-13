/**
 * asyncHandler.ts — Async Error Wrapper
 *
 * WHAT IT DOES:
 *   Wraps an async route handler so that any thrown error is automatically
 *   passed to Express's next(err) — which triggers the global error handler in app.ts.
 *
 * WHY:
 *   Without this, an unhandled promise rejection in a route handler would crash
 *   the process or hang the request. Express doesn't catch async errors by default.
 *
 * DESIGN PATTERN: Decorator
 *   asyncHandler wraps the original handler function without changing its signature.
 *   The caller doesn't know or care that error handling was added.
 *
 * USAGE:
 *   router.get("/", asyncHandler(controller.getUsers));
 *   // If getUsers throws, next(err) is called → global error handler responds
 *
 * CONNECTS TO:
 *   - app.ts (global error handler receives the error)
 *   - All route files (every handler is wrapped with this)
 */

import { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (handler: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // If the async handler rejects, catch it and forward to Express error handler
    handler(req, res, next).catch(next);
  };
};
