/**
 * primary button for most cta
 * @prop {string} text - text to display on button
 * @prop {string} padding - vertical and horizontal padding specified in tailwindcss
 * @prop {string} fontSize - font size specified in tailwindcss
 * @example
 * <PrimaryButton text="Get Started" padding="px-3.5 py-2.5" fontSize="text-lg" />
 * @returns
 */

interface PrimaryButtonProps {
  text: string;
  padding?: string;
  fontSize?: string;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  padding = "px-3.5 py-2.5",
  fontSize = "text-sm",
}) => {
  return (
    <button
      type="button"
      className={`rounded-full bg-violet-700 font-medium text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all duration-150
      ${padding} ${fontSize}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
