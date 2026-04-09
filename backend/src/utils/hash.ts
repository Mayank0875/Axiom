import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword: string) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

