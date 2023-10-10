import prisma from "../../utils/prisma";
/**
 * resolver function to fetch all listings - paginated
 * args: skip, take
 * @param {number} skip - number of records to skip
 * @param {number} take - number of records to take
 * - filters
 * @param {string} searchQuery - search query string
 * @param {number} bedrooms - number of bedrooms
 * @param {number} bathrooms - number of bathrooms
 * @param {number} minPrice - minimum price
 * @param {number} maxPrice - maximum price
 * @param {number} minArea - minimum area
 * @param {number} maxArea - maximum area
 * @returns - all listings or empty array if none
 */

export const getListings = async (args: {
  skip?: number | null | undefined;
  take?: number | null | undefined;
  searchQuery?: string | null | undefined;
  bedrooms?: number | null | undefined;
  bathrooms?: number | null | undefined;
  minPrice?: number | null | undefined;
  maxPrice?: number | null | undefined;
  minArea?: number | null | undefined;
  maxArea?: number | null | undefined;
}) => {
  const {
    skip,
    take,

    // filter query
    searchQuery,

    // specific filters
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
  } = args;

  // form filter object
  const filterConditions = [];

  // handle searchQuery
  if (searchQuery) {
    filterConditions.push({
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
        { location: { contains: searchQuery, mode: "insensitive" } },
      ],
    });
  }

  // handle bedrooms
  if (bedrooms) {
    filterConditions.push({ bedrooms: { equals: bedrooms } });
  }

  // handle bathrooms
  if (bathrooms) {
    filterConditions.push({ bathrooms: { equals: bathrooms } });
  }

  // handle minArea
  if (minArea) {
    filterConditions.push({ area: { gte: minArea } });
  }

  // handle maxArea
  if (maxArea) {
    filterConditions.push({ area: { lte: maxArea } });
  }

  // handle minPrice
  if (minPrice) {
    filterConditions.push({ price: { gte: minPrice } });
  }

  // handle maxPrice
  if (maxPrice) {
    filterConditions.push({ price: { lte: maxPrice } });
  }

  const filter = {
    AND: filterConditions,
  };

  return await prisma.listing.findMany({
    skip: skip || 0,
    take: take || 10,

    // TODO: Fix type here
    where: filter as any,
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
