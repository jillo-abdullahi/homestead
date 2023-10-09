import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({});
/**
 * resolver function to fetch all listings - paginated
 * args: skip, take
 * @param {number} skip - number of records to skip
 * @param {number} take - number of records to take
 * @returns - all listings or empty array if none
 */

export const getListings = async (args: {
  skip?: number | null | undefined;
  take?: number | null | undefined;
}) => {
  const { skip, take } = args;
  return await prisma.listing.findMany({
    skip: skip || 0,
    take: take || 10,
  });
};

/**
 * resolver function to fetch a listing by id
 * args: id
 * @param {string} id - id of the listing
 */
export const getListingById = async (args: { id: string }) => {
  const { id } = args;
  const listing = await prisma.listing.findUnique({
    where: {
      id,
    },
  });

  if (!listing) {
    throw new Error(`Listing with id ${id} not found`);
  }
  return listing;
};
