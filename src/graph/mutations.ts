import { gql } from "@apollo/client";

// create user
export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    createUser(email: $email, password: $password, username: $username) {
      username
      token
      id
      email
      createdAt
      confirmed
    }
  }
`;

// login user
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      id
      token
      username
      confirmed
      createdAt
    }
  }
`;

// forgot password
export const FORGOT_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      email
      username
    }
  }
`;

// update password
export const RESET_PASSWORD = gql`
  mutation UpdatePassword($password: String!) {
    updatePassword(password: $password) {
      email
      id
    }
  }
`;

// confirm user email
export const CONFIRM_USER_EMAIL = gql`
  mutation ConfirmUser {
    confirmUser {
      token
      id
      email
      username
      confirmed
    }
  }
`;

// resend confirmation email
export const RESEND_CONFIRMATION_EMAIL = gql`
  mutation ResendUserConfirmation($email: String!) {
    resendUserConfirmation(email: $email) {
      email
      id
    }
  }
`;

// create listing
export const CREATE_LISTING = gql`
  mutation CreateListing(
    $images: [String!]!
    $location: String!
    $price: Float!
    $title: String!
    $description: String
    $bedrooms: Int
    $bathrooms: Int
    $area: Int
  ) {
    createListing(
      images: $images
      location: $location
      price: $price
      title: $title
      description: $description
      bedrooms: $bedrooms
      bathrooms: $bathrooms
      area: $area
    ) {
      title
      id
    }
  }
`;

// update listing
export const UPDATE_LISTING = gql`
  mutation UpdateListing(
    $updateListingId: String!
    $images: [String!]!
    $location: String!
    $price: Float!
    $title: String!
    $area: Int
    $bathrooms: Int
    $bedrooms: Int
    $description: String
  ) {
    updateListing(
      id: $updateListingId
      images: $images
      location: $location
      price: $price
      title: $title
      area: $area
      bathrooms: $bathrooms
      bedrooms: $bedrooms
      description: $description
    ) {
      id
      title
    }
  }
`;

// request signature for image upload
export const REQUEST_CLOUDINARY_SIGNATURE = gql`
  mutation RequestUploadSignature($folder: String!, $timestamp: String!) {
    requestUploadSignature(folder: $folder, timestamp: $timestamp) {
      signature
      timestamp
    }
  }
`;

// delete listing
export const DELETE_LISTING = gql`
  mutation DeleteListing($deleteListingId: String!) {
    deleteListing(id: $deleteListingId) {
      title
      id
    }
  }
`;
