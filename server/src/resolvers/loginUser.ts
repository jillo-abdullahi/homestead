import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../utils/hashPassword.js";
import { signToken } from "../utils/jwt.js";
const prisma = new PrismaClient({});
/**
 * resolver function to login a user
 * @param args - email, password
 * @returns - user info and token
 */

export const loginUser = async (args: { email: string; password: string }) => {
  const { email, password } = args;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(`User not found`);
  }

  const isValidPassword = await verifyPassword(user.password, password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  return user;
};
