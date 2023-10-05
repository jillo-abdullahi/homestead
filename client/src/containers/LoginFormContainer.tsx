import { useState } from "react";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";

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
  });

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: check if credentials are valid
    // update error state accordingly after API call

    console.log(loginDetails);
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
              />
            </div>

            <div className="w-full">
              <PrimaryButton type="submit" fontSize="text-base">
                <span>Sign in</span>
              </PrimaryButton>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-violet-700 hover:text-violet-600"
            >
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginFormContainer;
