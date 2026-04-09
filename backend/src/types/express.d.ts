import { UserRole } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        roles: UserRole[];
      };
    }
  }
}

export {};

