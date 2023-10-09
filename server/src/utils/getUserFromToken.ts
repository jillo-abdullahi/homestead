import { PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { decodeToken, verifyToken } from "./jwt.js";

const prisma = new PrismaClient({});

/**
 * Function to get a user from a JWT token
 * @param {string} token - JWT token
 * @returns - user if token is valid, null otherwise
 */
export const getUserFromToken = async (token: string) => {
  if (!token) {
    return null;
  }

  // check token validity
  verifyToken(token);

  // decoding token
  const user = decodeToken(token);

  if (user) {
    const { id } = user as JwtPayload;

    const dbUser: User | null = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!dbUser) return null;

  
    const { password, ...userWithoutPassword } = dbUser;
    return userWithoutPassword;
    // will add check for non-existent user at resolver level
    // since we don't want to protect all queries/mutations
  }

  return null;
};
