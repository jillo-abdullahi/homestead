import { useState } from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";
import { LOGIN_USER } from "@/graph/mutations";
import FormUnknownError from "@/components/errorStates/FormUnknownError";
import { saveLoggedInUser } from "@/utils/saveLoggedInUser";

/**
 * Login form component.
 * @returns
 */
const LoginFormContainer = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    unknownError: "",
  });

  // mutation to login user
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const router = useRouter();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    clearFormErrors();
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearFormErrors = () => {
    setFormErrors((prevState) => ({
      ...prevState,
      password: "",
      email: "",
      unknownError: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginDetails;

    loginUser({
      variables: {
        email,
        password,
      },
      onCompleted: (data) => {
        saveLoggedInUser(data.loginUser);
        router.push("/");
      },
      onError: (error) => {
        const { message } = error;
        if (message.includes("credentials") || message.includes("not found")) {
          setFormErrors((prevState) => ({
            ...prevState,
            email: "Invalid credentials",
            password: "Invalid credentials",
          }));
          return;
        } else {
          setFormErrors((prevState) => ({
            ...prevState,
            unknownError: "An unknown error occurred",
          }));
        }
      },
    });
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <span className="font-bold text-xl text-gray-800 hover:text-gray-700 transition-all duration-100">
          Homestead
          <span className="text-violet-500 font-bold text-3xl">.</span>
        </span>
      </div>

      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-md rounded-lg bg-white p-10 ${
          formErrors.unknownError ? "blur-sm" : ""
        }`}
      >
        <h2 className="mt-6 text-left text-2xl font-bold leading-9 tracking-tight text-gray-700">
          Sign in to your account
        </h2>
        <p className="text-left text-sm leading-5 text-gray-600">
          Add your details below to get back into the app.
        </p>

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <InputFieldWithIcon
              type="email"
              name="email"
              id="email"
              onChange={handleChanges}
              placeholder="e.g. john.doe@gmail.com"
              icon={<EnvelopeIcon className="h-4 w-4 text-gray-500" />}
              value={loginDetails.email}
              label="Email address"
              isRequired={true}
              error={formErrors.email}
            />
          </div>

          <div className="mt-2">
            <InputFieldWithIcon
              type="password"
              name="password"
              id="password"
              onChange={handleChanges}
              placeholder="Enter your password"
              icon={<LockClosedIcon className="h-4 w-4 text-gray-500" />}
              value={loginDetails.password}
              label="Password"
              isLoginForm={true}
              isRequired={true}
              error={formErrors.password}
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
                <span>Sign in</span>
              )}
            </PrimaryButton>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-violet-700 hover:text-violet-600"
          >
            Create your account
          </Link>
        </p>
      </div>
      {/* in case of an unknown error  */}
      {formErrors.unknownError && (
        <FormUnknownError
          error={formErrors.unknownError}
          clearFormErrors={clearFormErrors}
        />
      )}
    </div>
  );
};

export default LoginFormContainer;
