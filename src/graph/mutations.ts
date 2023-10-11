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
