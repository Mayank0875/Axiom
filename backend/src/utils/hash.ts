/**
 * hash.ts — Password Hashing Utilities
 *
 * WHAT IT DOES:
 *   Hashes plain-text passwords before storing them in the database,
 *   and compares a plain-text password against a stored hash during login.
 *
 * WHY bcrypt:
 *   bcrypt is a slow, salted hashing algorithm designed specifically for passwords.
 *   It's intentionally slow to make brute-force attacks impractical.
 *   SALT_ROUNDS = 10 is the industry standard balance of security vs speed.
 *
 * SECURITY RULE:
 *   Plain-text passwords NEVER touch the database.
 *   Only the bcrypt hash is stored in users.password_hash.
 *
 * CONNECTS TO:
 *   - services/auth.service.ts
 *     → hashPassword() called during registration
 *     → comparePassword() called during login
 */

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/** Hash a plain-text password. Returns the bcrypt hash string. */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/** Compare a plain-text password against a stored bcrypt hash. Returns true if match. */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
