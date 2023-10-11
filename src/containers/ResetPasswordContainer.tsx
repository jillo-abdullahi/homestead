import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";
import isValidPassword from "@/utils/isValidPassword";
import { RESET_PASSWORD } from "@/graph/mutations";
import FormUnknownError from "@/components/errorStates/FormUnknownError";
import Banner from "@/components/banner";

/**
 * component to reset user password.
 * @returns
 */
const ResetPasswordContainer = () => {
  const [resetDetails, setResetDetails] = useState({
    password: "",
    confirmPassword: "",
    success: false,
  });
  const [formErrors, setFormErrors] = useState<{
    password?: string | React.ReactNode;
    confirmPassword?: string | React.ReactNode;
    unknownError?: string;
  }>({
    password: "",
    confirmPassword: "",
    unknownError: "",
  });

  const router = useRouter();

  // get token from router query
  const { token } = router.query;

  // mutation to create user
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    context: {
      headers: {
        authorization: token ?? "",
      },
    },
  });

  // clear form errors
  const clearFormErrors = () => {
    setFormErrors((prevState) => ({
      ...prevState,
      password: "",
      confirmPassword: "",
      unknownError: "",
    }));
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    // reset form errors
    clearFormErrors();
    // set state
    setResetDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password, confirmPassword } = resetDetails;

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
    resetPassword({
      variables: {
        password,
      },
      onCompleted: () => {
        setResetDetails((prevState) => ({ ...prevState, success: true }));
      },
      onError: (error) => {
        const { message } = error;
        if (message.includes("not found")) {
          setFormErrors((prevState) => ({
            ...prevState,
            password: "User not found - token invalid",
          }));
        } else {
          setFormErrors((prevState) => ({
            ...prevState,
            unknownError: "An unknown error occurred.",
          }));
        }
      },
    });
  };

  const successText = `Your password has been reset. Please login to continue.`;

  return (
    <>
      {resetDetails.success && <Banner text={successText} />}
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
            Reset your password
          </h2>
          <p className="text-left text-sm leading-5 text-gray-600">
            Enter your new password below.
          </p>

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="mt-2">
              <InputFieldWithIcon
                type="password"
                name="password"
                id="password"
                onChange={handleChanges}
                placeholder="Enter your password"
                icon={<LockClosedIcon className="h-4 w-4 text-gray-500" />}
                value={resetDetails.password}
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
                value={resetDetails.confirmPassword}
                label="Confirm password"
                isRequired={true}
                error={formErrors.confirmPassword}
              />
            </div>

            <div className="w-full">
              <PrimaryButton
                type="submit"
                fontSize="text-base"
                disabled={resetDetails.success}
              >
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
                  <span>Reset Password</span>
                )}
              </PrimaryButton>
              {resetDetails.success && (
                <p className="mt-4 text-center text-sm text-gray-500">
                  <Link
                    href="/auth/login"
                    className="font-semibold leading-6 text-violet-700 hover:text-violet-600"
                  >
                    Login to your account
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* in case of an unknown error  */}
        {formErrors.unknownError && (
          <FormUnknownError
            clearFormErrors={clearFormErrors}
            error={formErrors.unknownError}
          />
        )}
      </div>
    </>
  );
};

export default ResetPasswordContainer;
