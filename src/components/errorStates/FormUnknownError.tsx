import Image from "next/image";
import SecondaryButton from "../buttons/SecondaryButton";

/**
 * component to show when an unknown error occurs.
 * should be placed inside an relative positioned div.
 * @param {string} error - error message to display.
 * @param {function} clearFormErrors - function to clear form errors.
 * @returns
 */

interface FormUnknownErrorProps {
  error: string;
  clearFormErrors: () => void;
}

const FormUnknownError: React.FC<FormUnknownErrorProps> = ({
  error,
  clearFormErrors,
}) => {
  return (
    <div className="absolute z-20 w-full h-full flex items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center space-y-2">
        <Image src="/error.svg" width={150} height={150} alt="error" />
        <span className="text-gray-800 font-medium">
          {error}
          <br /> Please click the button below to try again.
        </span>
        <SecondaryButton onClick={clearFormErrors}>Try again</SecondaryButton>
      </div>
    </div>
  );
};

export default FormUnknownError;
