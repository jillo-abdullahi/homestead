import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient({});
/**
 * resolver function to create a new listing
 * @param args - title, description, price, location, bedrooms, bathrooms, area, images
 * @returns
 */

export const createListing = async (
  args: {
    title: string;
    description?: string | null | undefined;
    price: number;
    location: string;
    bedrooms?: number | null | undefined;
    bathrooms?: number | null | undefined;
    area?: number | null | undefined;
    images: string[];
  },
  user: User
) => {
  const {
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
  } = args;
  return await prisma.listing.create({
    data: {
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      area,
      images,
      user: {
        connect: { id: user?.id },
      },
    },
  });
};
