import { NextFunction, Request, Response } from "express";
import { UserRole } from "../models/user.model";

// Authorization middleware:
// Allows access only if current user has at least one required role.
export const requireRole =
  (...allowedRoles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const hasAccess = currentUser.roles.some((role) =>
      allowedRoles.includes(role)
    );
    if (!hasAccess) {
      return res.status(403).json({ message: "Forbidden: insufficient role." });
    }

    return next();
  };

