/**
 * role.middleware.ts — Role-Based Authorization Middleware
 *
 * WHAT IT DOES:
 *   Checks whether the authenticated user has at least one of the required roles.
 *   Returns 403 Forbidden if not.
 *
 * DESIGN PATTERN: Chain of Responsibility + Strategy
 *   requireRole() is a factory function — it returns a middleware configured
 *   for a specific set of allowed roles. This makes it reusable:
 *     requireRole("admin")              — admin only
 *     requireRole("faculty", "admin")   — either role allowed
 *
 * HOW IT WORKS:
 *   1. authenticate middleware must run first (sets req.user)
 *   2. requireRole reads req.user.roles
 *   3. Checks if any of the user's roles is in the allowedRoles list
 *   4. If yes → next(); if no → 403
 *
 * WHY AFTER authenticate:
 *   We need req.user to exist before checking roles.
 *   Route files always chain: authenticate → requireRole → handler
 *
 * CONNECTS TO:
 *   - auth.middleware.ts (must run before this)
 *   - All route files that have role-restricted endpoints
 *   - models/user.model.ts (UserRole type)
 */

import { NextFunction, Request, Response } from "express";
import { UserRole } from "../models/user.model";

/**
 * Factory: returns a middleware that allows only users with one of the given roles.
 * Usage: requireRole("admin", "faculty")
 */
export const requireRole =
  (...allowedRoles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.user;

    // authenticate should have run first — if not, reject
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    // Check if the user has at least one of the required roles
    const hasAccess = currentUser.roles.some((role) => allowedRoles.includes(role));
    if (!hasAccess) {
      return res.status(403).json({ message: "Forbidden: insufficient role." });
    }

    return next();
  };
