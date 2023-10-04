import { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputFieldWithIcon from "@/components/InputFieldWithIcon";
import isValidPassword from "@/utils/isValidPassword";

/**
 * sign up form component to register a new user.
 * @returns
 */
const SignupForm = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string | React.ReactNode;
    confirmPassword?: string | React.ReactNode;
  }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    // reset field error once user starts typing
    // reset form errors
    setFormErrors((prevState) => ({
      ...prevState,
      password: "",
      confirmPassword: "",
      username: "",
    }));
    // set state
    setSignUpDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password, confirmPassword, username } = signUpDetails;

    // check if username is longer than 10 characters
    if (username.length > 10) {
      setFormErrors((prevState) => ({
        ...prevState,
        username: "Username must be less than 10 characters",
      }));
      return;
    }

    // check if password is valid
    if (!isValidPassword(password)) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: (
          <span>
            Password must contain:
            <ul className="list-disc pl-4">
              <li>At least 8 characters.</li>
              <li>At least one uppercase letter.</li>
              <li>At least one special character.</li>
              <li>At least one number.</li>
            </ul>
          </span>
        ),
      }));
      return;
    }

    // check if password and confirm password match
    if (password !== confirmPassword) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    //TODO: Make API call to create user
    // update error state accordingly after API call

    console.log(signUpDetails);
  };

  return (
    <div className="container">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <span className="font-bold text-xl text-gray-800 hover:text-gray-700 transition-all duration-100">
            Homestead
            <span className="text-violet-500 font-bold text-3xl">.</span>
          </span>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md rounded-lg bg-white p-10">
          <h2 className="mt-6 text-left text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Create your account
          </h2>
          <p className="text-left text-sm leading-5 text-gray-600">
            {`Let's get you started at Homestead.`}
          </p>

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <InputFieldWithIcon
              type="text"
              name="username"
              id="username"
              onChange={handleChanges}
              placeholder="e.g. johnnyCage"
              icon={<AtSymbolIcon className="h-4 w-4 text-gray-500" />}
              value={signUpDetails.username}
              label="Username"
              isRequired={true}
              error={formErrors.username}
            />
            <InputFieldWithIcon
              type="email"
              name="email"
              id="email"
              onChange={handleChanges}
              placeholder="e.g. john.doe@gmail.com"
              icon={<EnvelopeIcon className="h-4 w-4 text-gray-500" />}
              value={signUpDetails.email}
              label="Email address"
              isRequired={true}
              error={formErrors.email}
            />

            <div className="mt-2">
              <InputFieldWithIcon
                type="password"
                name="password"
                id="password"
                onChange={handleChanges}
                placeholder="Enter your password"
                icon={<LockClosedIcon className="h-4 w-4 text-gray-500" />}
                value={signUpDetails.password}
                label="Password"
                isRequired={true}
                error={formErrors.password}
              />
            </div>
            <div className="mt-2">
              <InputFieldWithIcon
                type="password"
                name="confirmPassword"
                id="password"
                onChange={handleChanges}
                placeholder="Confirm your password"
                icon={<LockClosedIcon className="h-4 w-4 text-gray-500" />}
                value={signUpDetails.confirmPassword}
                label="Confirm password"
                isRequired={true}
                error={formErrors.confirmPassword}
              />
            </div>

            <div className="w-full">
              <PrimaryButton type="submit" fontSize="text-base">
                <span>Create account</span>
              </PrimaryButton>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-violet-700 hover:text-violet-600"
            >
              Login to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;