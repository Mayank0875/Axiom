/**
 * auth.middleware.ts — Authentication Middleware
 *
 * WHAT IT DOES:
 *   Reads the JWT from the Authorization header, verifies it,
 *   and attaches the decoded user payload to req.user.
 *
 * DESIGN PATTERN: Chain of Responsibility (Middleware Chain)
 *   This middleware sits in the Express pipeline before any protected route handler.
 *   If the token is missing or invalid, it short-circuits with 401.
 *   If valid, it calls next() and the request continues to the controller.
 *
 * HOW IT WORKS:
 *   1. Read "Authorization: Bearer <token>" header
 *   2. Strip "Bearer " prefix
 *   3. Call verifyToken() — throws if expired or tampered
 *   4. Attach { userId, roles } to req.user
 *   5. Call next() to proceed to the route handler
 *
 * WHY req.user:
 *   Controllers and services need to know WHO is making the request.
 *   Attaching it to req means every downstream handler can read req.user
 *   without re-parsing the token.
 *
 * CONNECTS TO:
 *   - utils/jwt.ts (verifyToken)
 *   - types/express.d.ts (extends Request with user field)
 *   - All protected route files (used as middleware before handlers)
 */

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Must be "Bearer <token>"
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyToken(token);
    // Attach decoded user to request — available in all downstream handlers
    req.user = {
      userId: Number(payload.userId), // pg returns bigint as string, coerce to number
      roles:  payload.roles,
    };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
