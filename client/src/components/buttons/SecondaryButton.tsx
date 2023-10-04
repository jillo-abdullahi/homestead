/**
 * secondary button component
 * @prop {string} padding - vertical and horizontal padding specified in tailwindcss
 * @prop {string} fontSize - font size specified in tailwindcss
 * @prop {React.ReactNode} children - children of the button
 * @prop {function} onClick - function to be called when the button is clicked
 * @returns
 */

interface SecondaryButtonProps {
  children: React.ReactNode;
  padding?: string;
  fontSize?: string;
  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  padding = "px-3.5 py-2.5",
  fontSize = "text-sm",
  children,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`rounded-lg bg-transparent font-medium text-violet-700 shadow-sm hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-200 transition-all duration-150 border-violet-700 border-2
    ${padding} ${fontSize}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
