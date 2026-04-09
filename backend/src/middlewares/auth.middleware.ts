import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

// Authentication middleware:
// 1) Read Bearer token
// 2) Verify token
// 3) Attach user payload to request
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyToken(token);
    req.user = {
      userId: payload.userId,
      roles: payload.roles,
    };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

