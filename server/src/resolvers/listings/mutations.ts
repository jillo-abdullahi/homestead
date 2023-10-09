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

  try {
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
  } catch (error) {
    throw new Error(`Error creating listing: ${error}`);
  }
};

/**
 * resolver function to update a listing
 * @param args - id, title, description, price, location, bedrooms, bathrooms, area, images
 * @returns - updated listing
 */

export const updateListing = async (
  args: {
    id: string;
    title: string;
    description?: string | null | undefined;
    price: number;
    location: string;
    bedrooms?: number | null | undefined;
    bathrooms?: number | null | undefined;
    area?: number | null | undefined;
    images: string[] | [];
  },
  user: User
) => {
  const {
    id,
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
  } = args;

  // make sure the user owns the listing
  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) throw new Error("Listing not found");
    if (listing.userId !== user?.id) throw new Error("You don't own this listing");
  } catch (error) {
    throw new Error(`Error finding listing: ${error}`);
  }

  try {
    return await prisma.listing.update({
      where: { id },
      data: {
        title,
        description,
        price,
        location,
        bedrooms,
        bathrooms,
        area,
        images,
      },
    });
  } catch (error) {
    throw new Error(`Error updating listing: ${error}`);
  }
};
