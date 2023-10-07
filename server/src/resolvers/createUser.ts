import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon from "argon2";

const prisma = new PrismaClient({});
/**
 * resolver function to create a new user
 * @param args - email, username, password
 * @returns - newly created user
 * @throws - error if user cannot be created
 *
 */
const createUser = async (args: {
  email: string;
  username: string;
  password: string;
}) => {
  // hash password
  const { email, username, password } = args;
  let hashedPassword: string;
  try {
    hashedPassword = await argon.hash(password);
  } catch (error) {
    throw new Error(`Error hashing password: ${error}`);
  }

  // create user
  try {
    return await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error(`User with ${error.meta?.target} already exists`);
    } else {
      throw new Error(`Error creating user: ${error}`);
    }
  }
};

export { createUser };
