import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";

// TODO: update these imports
import sendMail from "../mail/index.js";
import { signToken } from "../utils/jwt.js";

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
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // generate token and url to confirm user registration
    const confirmationToken = await signToken({
      id: user.id,
      email: user.email,
      confirmed: user.confirmed,
    });
    const url = `${process.env.CLIENT_BASE_URL}/auth/confirm-email?token=${confirmationToken}`;

    // send confirmation email
    await sendMail({
      userEmail: email,
      username,
      url,
      isEmailConfirmation: true,
    });

    return user;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error(`User with ${error.meta?.target} already exists`);
    } else {
      throw new Error(`Error creating user: ${error}`);
    }
  }
};

export { createUser };
