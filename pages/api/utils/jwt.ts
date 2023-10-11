import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma";

export enum TokenError {
  CAN_NOT_SIGN = "Cannot sign token",
}

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
    return jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw new Error(TokenError.CAN_NOT_SIGN);
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
    return false;
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
  const user = verifyToken(token);

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
