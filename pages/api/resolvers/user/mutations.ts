import { User } from "@prisma/client";
import prisma from "../../utils/prisma";
import { signToken, verifyToken } from "../../utils/jwt";
import { hashPassword, verifyPassword } from "../../utils/hashPassword";
import sendMail from "../../mail";

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

    // save confirmation token to db
    await prisma.confirmationToken.create({
      data: {
        token: confirmationToken,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
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
    return user;
  }

  try {
    // delete confirmation token
    await prisma.confirmationToken.delete({
      where: {
        userId: id,
      },
    });

    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        confirmed: true,
      },
    });
  } catch (error) {
    throw new Error("Error confirming user");
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
 * resolver function to send password reset email
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
  let resetToken;

  const signJWTToken = () => {
    return signToken({
      id: user.id,
      email: user.email,
      confirmed: user.confirmed,
    });
  };

  // save the reset token to db
  try {
    // check if user already has a reset token
    const existingResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (existingResetToken) {
      // validate token
      const tokenDetails = verifyToken(existingResetToken.token);

      // token is invalid
      if (!tokenDetails) {
        // generate new token and update record
        resetToken = signJWTToken();
        await prisma.passwordResetToken.update({
          where: {
            userId: user.id,
          },
          data: {
            token: resetToken,
          },
        });
      } else {
        // resend existing token since it is still valid
        resetToken = existingResetToken.token;
      }
    } else {
      resetToken = signJWTToken();
      await prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }
  } catch (error) {
    throw new Error("Error generating reset token");
  }

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

  // delete password reset token
  try {
    await prisma.passwordResetToken.delete({
      where: {
        userId: user.id,
      },
    });
  } catch (error) {
    throw new Error("Error deleting password reset token");
  }

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
    throw new Error("Error updating password");
  }
};

/**
 * resolver function to resend user confirmation email
 * args: user email
 * @param {string} email - email of user
 */
export const resendUserConfirmation = async (args: { email: string }) => {
  const { email } = args;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(`User with email not found`);
  }

  try {
    // first check if user already has a confirmation token
    const existingConfirmationToken = await prisma.confirmationToken.findUnique(
      {
        where: {
          userId: user.id,
        },
      }
    );

    if (existingConfirmationToken?.token) {
      await prisma.confirmationToken.delete({
        where: {
          userId: user.id,
        },
      });
    }
  } catch (error) {
    throw new Error("Error deleting confirmation token");
  }

  // create a new confirmation token
  const token = signToken({
    email: user.email,
    id: user.id,
    confirmed: user.confirmed,
  });

  try {
    await prisma.confirmationToken.create({
      data: {
        token,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const url = `${process.env.CLIENT_BASE_URL}/auth/confirm-email?token=${token}`;

    // send confirmation email
    await sendMail({
      userEmail: email,
      username: user.username,
      url,
      isEmailConfirmation: true,
    });
  } catch (error) {
    throw new Error("Error creating confirmation token");
  }

  return user;
};
