import { gql } from "@apollo/client";

export const GET_ALL_LISTINGS = gql`
  query Listings {
    listings {
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
  }
`;
