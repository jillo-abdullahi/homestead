import prisma from "../../utils/prisma";
import getListingsFilter from "../../utils/getListingsFilter";
import { Nullable, ListingsFilter } from "../../types";
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
  skip?: Nullable<number>;
  take?: Nullable<number>;
  searchQuery?: Nullable<string>;
  bedrooms?: Nullable<number>;
  bathrooms?: Nullable<number>;
  minPrice?: Nullable<number>;
  maxPrice?: Nullable<number>;
  minArea?: Nullable<number>;
  maxArea?: Nullable<number>;
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

  const filters = getListingsFilter({
    searchQuery,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
  });

  return await prisma.listing.findMany({
    skip: skip || 0,
    take: take || 10,
    orderBy: {
      createdAt: "desc",
    },

    // TODO: Fix type here
    where: filters as any,
  });
};

/**
 * resolver method to return listings count matching a filter
 * @param args - filter
 * @returns - count of listings matching the filter
 */
export const getListingsCount = async (args: ListingsFilter) => {
  return await prisma.listing.count({
    where: getListingsFilter({ ...args }) as any,
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
