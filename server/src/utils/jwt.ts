import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient({});

/**
 * check if env secret is set
 * @param data
 * @returns
 */
export const checkEnv = (data: string) => {
  if (!data) {
    throw new Error("JWT_SECRET environment is not set");
  }
};

/**
 * sign jwt token
 * @param data - email and id
 * @returns signed jwt token string or error
 */
export const signToken = (data: {
  email: string;
  id: string;
  confirmed: boolean;
}) => {
  checkEnv(process.env.JWT_SECRET!);
  try {
    return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "7d" });
  } catch (error) {
    throw new Error(`Error signing token: ${error}`);
  }
};

/**
 * verify jwt token
 * @param token - jwt token
 * @returns decoded jwt token or error
 */
export const verifyToken = (token: string) => {
  checkEnv(process.env.JWT_SECRET!);
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Error(`Error verifying token: ${error}`);
  }
};

/**
 * decode jwt token
 * @param token - jwt token
 * @returns decoded jwt token or error
 */

export const decodeToken = (token: string) => {
  checkEnv(process.env.JWT_SECRET!);
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error(`Error decoding token: ${error}`);
  }
};

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
