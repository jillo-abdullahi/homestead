import { PrismaClient, User } from "@prisma/client";
import { signToken } from "../../utils/jwt.js";
import { hashPassword, verifyPassword } from "../../utils/index.js";
import sendMail from "../../mail/index.js";

const prisma = new PrismaClient({});

/**
 * resolver function to create a new user
 * @param args - email, username, password
 * @returns - newly created user
 * @throws - error if user cannot be created
 *
 */
export const createUser = async (args: {
  email: string;
  username: string;
  password: string;
}) => {
  // hash password
  const { email, username, password } = args;
  let hashedPassword: string;
  try {
    hashedPassword = await hashPassword(password);
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

/**
 * resolver function to confirm a user's email
 * @param args - confirmation JWT token
 * @returns - updated user info with confirmed set to true
 */

export const confirmUser = async (user: User) => {
  const { id, confirmed } = user;
  if (confirmed) {
    throw new Error("User already confirmed");
  }
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        confirmed: true,
      },
    });
  } catch (error) {
    throw new Error(`Error confirming user: ${error}`);
  }
};

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

/**
 * resolver function to reset user password
 * @param args - email
 * @returns - user info after sending reset password email
 */
export const resetPassword = async (args: { email: string }) => {
  const { email } = args;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(`User not found`);
  }

  // generate token and url to reset user password
  const resetToken = await signToken({
    id: user.id,
    email: user.email,
    confirmed: user.confirmed,
  });
  const url = `${process.env.CLIENT_BASE_URL}/auth/reset-password?token=${resetToken}`;

  // send reset password email
  await sendMail({
    userEmail: email,
    username: user.username,
    url,
    isEmailConfirmation: false,
  });

  return user;
};

/**
 * resolver function to update user password
 * @param args - password, token
 * @returns - user info after updating password
 */

export const updatePassword = async (
  args: {
    password: string;
  },
  user: User
) => {
  const { password } = args;

  // hash password
  let hashedPassword: string;
  try {
    hashedPassword = await hashPassword(password);
  } catch (error) {
    throw new Error(`Error hashing password: ${error}`);
  }
  const { email } = user;

  // update user password
  try {
    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error(`Error updating password: ${error}`);
  }
};
