import Image from "next/image";
import SecondaryButton from "../buttons/SecondaryButton";

/**
 * component to show when an unknown error occurs.
 * should be placed inside an relative positioned div.
 * @param {string} error - error message to display.
 * @param {function} clearFormErrors - function to clear form errors.
 * @param {string} [buttonText="Try again"] - text to display on button.
 * @param {string} [subText="Please click the button below to try again."] - sub text to display.
 * @returns
 */

interface FormUnknownErrorProps {
  error: string;
  subText?: string;
  buttonText?: string;
  clearFormErrors: () => void;
}

const FormUnknownError: React.FC<FormUnknownErrorProps> = ({
  error,
  clearFormErrors,
  buttonText = "Try again",
  subText = "Please click the button below to try again.",
}) => {
  return (
    <div className="absolute z-20 w-full h-full flex items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center space-y-2">
        <Image src="/error.svg" width={150} height={150} alt="error" />
        <span className="text-gray-800 font-medium">
          {error}
          <br /> {subText}
        </span>
        <SecondaryButton onClick={clearFormErrors}>
          {buttonText}
        </SecondaryButton>
      </div>
    </div>
  );
};

export default FormUnknownError;
