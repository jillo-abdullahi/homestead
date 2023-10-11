import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormUnknownError from "@/components/errorStates/FormUnknownError";
import Banner from "@/components/banner";
import { FORGOT_PASSWORD } from "@/graph/mutations";

/**
 * component to handle forgot password
 * @returns
 */
const ForgotPasswordContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    unknownError: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // mutation to send reset password link
  const [sendResetLink, { loading }] = useMutation(FORGOT_PASSWORD);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearForm();
    setEmail(e.target.value);
  };

  const clearForm = () => {
    setFormErrors((prevState) => ({
      ...prevState,
      email: "",
      unknownError: "",
    }));
    setShowSuccessMessage(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendResetLink({
      variables: {
        email,
      },
      onCompleted: () => {
        setShowSuccessMessage(true);
      },
      onError: (error) => {
        const { message } = error;
        if (message.includes("not found")) {
          setFormErrors((prevState) => ({
            ...prevState,
            email: "No user found with this email address.",
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

  const successText = `A reset link has been sent to ${email}. Please check your email.`;

  return (
    <>
      {showSuccessMessage && <Banner dismiss={clearForm} text={successText} />}
      <div
        className={`relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <span className="font-bold text-xl text-gray-800 hover:text-gray-700 transition-all duration-100">
            Homestead
            <span className="text-violet-500 font-bold text-3xl">.</span>
          </span>
        </div>
        <div
          className={`mt-10 sm:mx-auto sm:w-full sm:max-w-md rounded-lg bg-white p-10  ${
            formErrors.unknownError && "blur-sm"
          }`}
        >
          <h2 className="mt-6 text-left text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Forgot password
          </h2>
          <p className="text-left text-sm leading-5 text-gray-600">
            Submit your email address below and we will send you a reset link.
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
                value={email}
                label="Email address"
                isRequired={true}
                error={formErrors.email}
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
                  <span>Send</span>
                )}
              </PrimaryButton>
            </div>
          </form>
        </div>
        {formErrors.unknownError && (
          <FormUnknownError
            error={formErrors.unknownError}
            clearFormErrors={clearForm}
          />
        )}
      </div>
    </>
  );
};

export default ForgotPasswordContainer;
