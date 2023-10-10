/**
 * function to check for valid password
 * @param {string} password
 * @returns {boolean} true if password is valid, false otherwise
 */
const isValidPassword = (password: string) => {
  // regular expressions for password checks
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasNumber = /[0-9]/;

  // check conditions
  if (
    password.length >= 8 &&
    hasUppercase.test(password) &&
    hasSpecialChar.test(password) &&
    hasNumber.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};

export default isValidPassword;
