/**
 * primary button for most cta
 * @prop {string} padding - vertical and horizontal padding specified in tailwindcss
 * @prop {string} fontSize - font size specified in tailwindcss
 * @prop {React.ReactNode} children - children of the button
 * @prop {string} type - type of button
 * @returns
 */

interface PrimaryButtonProps {
  padding?: string;
  fontSize?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  padding = "px-3.5 py-2.5",
  fontSize = "text-sm",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`rounded-lg bg-violet-700 font-medium text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all duration-150
      border-transparent border-2 w-full
      ${padding} ${fontSize}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
