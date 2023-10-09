import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient({});

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
