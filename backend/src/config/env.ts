import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 8080),
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/axiom_lms",
  jwtSecret: process.env.JWT_SECRET ?? "change-this-secret-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
};

