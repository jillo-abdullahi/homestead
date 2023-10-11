/**
 * function to save logged in user to local storage
 */

type User = {
  email: string;
  id: string;
  token: string;
  username: string;
  confirmed: boolean;
  createdAt: string;
};

export const saveLoggedInUser = (user: User) => {
  localStorage.setItem("homesteaduser", JSON.stringify(user));
};

/**
 * function to remove logged in user from local storage
 * ensures that user is logged out
 */
export const removeLoggedInUser = () => {
  localStorage.removeItem("homesteaduser");
  window.location.reload();
};
