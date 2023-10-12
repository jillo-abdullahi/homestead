import { ListingsFilter } from "../types";
/**
 * function to craft and return filter object for listings query
 * @param args - filter arguments
 * @returns - filter object
 */

const getListingsFilter = (args: ListingsFilter) => {
  const {
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

  return filter;
};

export default getListingsFilter;
