import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  EnvelopeIcon,
  LockClosedIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";
import isValidPassword from "@/utils/isValidPassword";
import { CREATE_USER } from "@/graph/mutations";
import FormUnknownError from "@/components/errorStates/FormUnknownError";
import { saveLoggedInUser } from "@/utils/saveLoggedInUser";
import BrandName from "@/components/brandName";

/**
 * sign up form component to register a new user.
 * @returns
 */
const SignupFormContainer = () => {
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
    unknownError?: string;
  }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    unknownError: "",
  });

  // mutation to create user
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const router = useRouter();

  // clear form errors
  const clearFormErrors = () => {
    setFormErrors((prevState) => ({
      ...prevState,
      password: "",
      confirmPassword: "",
      username: "",
      email: "",
      unknownError: "",
    }));
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    // reset form errors
    clearFormErrors();
    // set state
    setSignUpDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password, confirmPassword, username, email } = signUpDetails;

    // check if username is longer than 40 characters
    if (username.length > 40) {
      setFormErrors((prevState) => ({
        ...prevState,
        username: "Username must be less than 40 characters",
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

    // create user
    createUser({
      variables: {
        username,
        email,
        password,
      },
      onCompleted: (data) => {
        saveLoggedInUser(data.createUser);
        router.push("/auth/confirm-email");
      },
      onError: (error) => {
        const { message } = error;
        // check if username or email already exists
        if (message.includes("email") || message.includes("username")) {
          setFormErrors((prevState) => ({
            ...prevState,
            email: message.includes("email") ? message : "",
            username: message.includes("username") ? message : "",
          }));
          return;
        } else {
          setFormErrors((prevState) => ({
            ...prevState,
            unknownError: "An unknown error occurred.",
          }));
          return;
        }
      },
    });
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex w-full items-center justify-center">
        <BrandName />
      </div>

      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-md rounded-lg bg-white p-10 ${
          formErrors.unknownError ? "blur-sm" : ""
        }`}
      >
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
              {loading ? (
                <div className="w-full flex justify-center items-center py-1">
                  <Image
                    src="/loader.svg"
                    width={50}
                    height={50}
                    alt="spinner"
                  />
                </div>
              ) : (
                <span>Create account</span>
              )}
            </PrimaryButton>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            href="/auth/login"
            className="font-semibold leading-6 text-violet-700 hover:text-violet-600"
          >
            Login to your account
          </Link>
        </p>
      </div>

      {/* in case of an unknown error  */}
      {formErrors.unknownError && (
        <FormUnknownError
          clearFormErrors={clearFormErrors}
          error={formErrors.unknownError}
        />
      )}
    </div>
  );
};

export default SignupFormContainer;
