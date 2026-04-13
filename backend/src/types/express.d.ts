/**
 * types/express.d.ts — Express Request Type Extension
 *
 * WHAT IT DOES:
 *   Extends Express's built-in Request interface to include a `user` field.
 *
 * WHY:
 *   TypeScript doesn't know that auth.middleware.ts attaches req.user.
 *   Without this declaration, accessing req.user anywhere would be a type error.
 *   This file tells TypeScript: "trust me, req.user exists after authenticate runs."
 *
 * HOW IT WORKS:
 *   TypeScript supports "declaration merging" — you can extend existing interfaces
 *   from external libraries by re-declaring them in a .d.ts file.
 *
 * CONNECTS TO:
 *   - middlewares/auth.middleware.ts (sets req.user)
 *   - All controllers that read req.user (UserController, QuizController, etc.)
 *   - models/user.model.ts (UserRole type)
 */

import { UserRole } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;   // decoded from JWT — identifies the caller
        roles: UserRole[]; // decoded from JWT — determines permissions
      };
    }
  }
}

export {};
