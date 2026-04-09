import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRole } from "../models/user.model";

export type JwtPayloadData = {
  userId: number;
  roles: UserRole[];
};

export const generateToken = (payload: JwtPayloadData) => {
  const signOptions: jwt.SignOptions = {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtSecret, {
    ...signOptions,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret) as JwtPayloadData;
};

