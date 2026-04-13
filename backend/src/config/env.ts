/**
 * env.ts — Environment Configuration
 *
 * WHAT IT DOES:
 *   Loads .env file and exports all environment variables as a typed object.
 *
 * WHY:
 *   Centralises all config in one place. Every file that needs PORT, DATABASE_URL,
 *   or JWT_SECRET imports from here — not directly from process.env.
 *   This makes it easy to change config without hunting through the codebase.
 *
 * CONNECTS TO:
 *   - database.ts (uses databaseUrl)
 *   - jwt.ts (uses jwtSecret, jwtExpiresIn)
 *   - server.ts (uses port)
 */

import dotenv from "dotenv";

dotenv.config(); // reads .env file into process.env

export const env = {
  nodeEnv:     process.env.NODE_ENV      ?? "development",
  port:        Number(process.env.PORT   ?? 8080),
  databaseUrl: process.env.DATABASE_URL  ?? "postgres://postgres:postgres@localhost:5432/axiom_lms",
  jwtSecret:   process.env.JWT_SECRET    ?? "change-this-secret-in-production",
  jwtExpiresIn:process.env.JWT_EXPIRES_IN ?? "7d",
};
