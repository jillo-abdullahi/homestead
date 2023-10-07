import jwt from "jsonwebtoken";

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
export const signToken = (data: { email: string; id: string }) => {
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

