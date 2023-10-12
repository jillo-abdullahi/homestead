import { gql } from "@apollo/client";

// fetch all listings query
// TODO: to add pagination
export const GET_ALL_LISTINGS = gql`
  query Listings($skip: Int, $take: Int) {
    listings(skip: $skip, take: $take) {
      area
      bathrooms
      bedrooms
      createdAt
      description
      id
      images
      location
      price
      title
      user {
        username
      }
    }
    getListingsCount
  }
`;

// fetch a single listing query
export const GET_LISTING = gql`
  query Listing($listingId: String!) {
    listing(id: $listingId) {
      area
      bathrooms
      bedrooms
      createdAt
      description
      id
      images
      location
      price
      title
      user {
        username
        id
      }
    }
  }
`;

// filter listings query
export const FILTER_LISTINGS = gql`
  query Listings(
    $bathrooms: Int
    $bedrooms: Int
    $maxArea: Int
    $maxPrice: Int
    $minArea: Int
    $minPrice: Int
    $searchQuery: String
    $skip: Int
    $take: Int
  ) {
    listings(
      bathrooms: $bathrooms
      bedrooms: $bedrooms
      maxArea: $maxArea
      maxPrice: $maxPrice
      minArea: $minArea
      minPrice: $minPrice
      searchQuery: $searchQuery
      skip: $skip
      take: $take
    ) {
      id
      title
      price
      location
      images
    }
    getListingsCount(
      bathrooms: $bathrooms
      bedrooms: $bedrooms
      maxArea: $maxArea
      maxPrice: $maxPrice
      minArea: $minArea
      minPrice: $minPrice
      searchQuery: $searchQuery
    )
  }
`;
