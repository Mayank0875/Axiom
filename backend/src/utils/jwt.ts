/**
 * jwt.ts — JSON Web Token Utilities
 *
 * WHAT IT DOES:
 *   Generates and verifies JWTs used for stateless authentication.
 *
 * HOW AUTHENTICATION WORKS:
 *   1. User logs in → AuthService calls generateToken({ userId, roles })
 *   2. Token is returned to the client and stored (localStorage)
 *   3. Client sends "Authorization: Bearer <token>" on every request
 *   4. authenticate middleware calls verifyToken() to decode it
 *   5. Decoded { userId, roles } is attached to req.user
 *
 * TOKEN PAYLOAD:
 *   { userId: number, roles: UserRole[] }
 *   — userId identifies who is making the request
 *   — roles determines what they are allowed to do
 *
 * SECURITY:
 *   - Signed with JWT_SECRET from .env (never commit this)
 *   - Expires after JWT_EXPIRES_IN (default 7 days)
 *   - verifyToken throws if tampered or expired
 *
 * CONNECTS TO:
 *   - config/env.ts (reads jwtSecret, jwtExpiresIn)
 *   - services/auth.service.ts (calls generateToken after login/register)
 *   - middlewares/auth.middleware.ts (calls verifyToken on each request)
 *   - models/user.model.ts (UserRole type)
 */

import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRole } from "../models/user.model";

export type JwtPayloadData = {
  userId: number;
  roles: UserRole[];
};

/** Create a signed JWT containing userId and roles */
export const generateToken = (payload: JwtPayloadData): string => {
  const signOptions: jwt.SignOptions = {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  };
  return jwt.sign(payload, env.jwtSecret, signOptions);
};

/** Verify and decode a JWT — throws if invalid or expired */
export const verifyToken = (token: string): JwtPayloadData => {
  return jwt.verify(token, env.jwtSecret) as JwtPayloadData;
};
