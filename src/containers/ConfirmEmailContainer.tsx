import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  CONFIRM_USER_EMAIL,
  RESEND_CONFIRMATION_EMAIL,
} from "@/graph/mutations";
import { saveLoggedInUser } from "@/utils/saveLoggedInUser";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Banner from "@/components/banner";
import BrandName from "@/components/brandName";

/**
 * component to confirm user email
 * shows a success message if email is confirmed
 * otherwise shows text asking user to check email
 * if token is invalid, prompts user to resend email
 * @returns
 */
const ConfirmEmailContainer: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;

  const [confirmState, setConfirmState] = useState({
    success: false,
    error: false,
  });

  // state to resend confirmation email
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // mutation to confirm user email
  const [confirmUserEmail] = useMutation(CONFIRM_USER_EMAIL, {
    context: {
      headers: {
        authorization: token ?? "",
      },
    },
  });

  // mutation to resend confirmation email
  const [resendConfirmationEmail, { loading }] = useMutation(
    RESEND_CONFIRMATION_EMAIL
  );

  // clear form errors
  const clearForm = () => {
    setFormErrors((prevState) => ({
      ...prevState,
      email: "",
    }));
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearForm();
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resendConfirmationEmail({
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
            email: "An unknown error occurred. Please try again.",
          }));
        }
      },
    });
  };

  const goToDashboard = () => {
    router.push("/");
  };

  useEffect(() => {
    if (token) {
      confirmUserEmail({
        variables: {
          token,
        },
        onCompleted: (data) => {
          setConfirmState((prevState) => ({
            ...prevState,
            success: true,
            error: false,
          }));
          saveLoggedInUser(data.confirmUser);
        },
        onError: () => {
          setConfirmState((prevState) => ({
            ...prevState,
            success: false,
            error: true,
          }));
        },
      });
    }
  }, [token]);

  // token is invalid
  const isInvalidToken = confirmState.error && token;
  const bannerSuccessText = `A confirmation email has been sent to ${email}. Please check your email.`;

  return (
    <>
      {showSuccessMessage && <Banner text={bannerSuccessText} />}
      <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex w-full items-center justify-center">
          <BrandName />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md rounded-lg bg-white p-10">
          <div className="text-center flex items-center justify-center flex-col">
            <Image
              src={
                confirmState.success
                  ? "/success.svg"
                  : isInvalidToken
                  ? "/error.svg"
                  : "/mail.svg"
              }
              alt="status icon"
              width={200}
              height={200}
              className="mb-6"
            />
            <h1 className="text-lg font-medium text-gray-800">
              {confirmState.success && "Email confirmed successfully!"}
              {isInvalidToken && (
                <div>
                  <div className="text-center">
                    Your confirmation token is invalid
                  </div>
                  <span className="text-center text-base">
                    Please enter your email address to resend confirmation email
                  </span>
                </div>
              )}
              {!token && (
                <div>
                  <div className="text-center">
                    We have sent you a confirmation link.
                  </div>
                  <span className="text-center text-base">
                    Please check your email to confirm your account.
                  </span>
                </div>
              )}
            </h1>
            {confirmState.success && (
              <div className="mt-2">
                <SecondaryButton onClick={goToDashboard}>
                  <span>Go to dashboard</span>
                </SecondaryButton>
              </div>
            )}

            {isInvalidToken && (
              <form className="space-y-6 mt-6 w-full" onSubmit={handleSubmit}>
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
                      <span>Re-send confirmation email</span>
                    )}
                  </PrimaryButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmailContainer;
