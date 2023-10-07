import { hash, verify } from "argon2";

/**
 * hash password
 * @param password -  string password
 * @returns hashed password
 */
export const hashPassword = async (password: string) => {
  return await hash(password);
};

/**
 * verify password
 * @param hash - hashed password
 * @param password - string password to verify
 * @returns boolean if password matches hash or not
 */
export const verifyPassword = async (hash: string, password: string) => {
  return await verify(hash, password);
};
