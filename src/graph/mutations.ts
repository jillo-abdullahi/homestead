import { gql } from "@apollo/client";

// create user query
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
