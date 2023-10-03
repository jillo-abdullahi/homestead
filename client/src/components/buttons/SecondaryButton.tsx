/**
 * secondary button component
 * @prop {string} padding - vertical and horizontal padding specified in tailwindcss
 * @prop {string} fontSize - font size specified in tailwindcss
 * @prop {React.ReactNode} children - children of the button
 * @returns
 */

interface SecondaryButtonProps {
  children: React.ReactNode;
  padding?: string;
  fontSize?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  padding = "px-3.5 py-2.5",
  fontSize = "text-sm",
  children,
}) => {
  return (
    <button
      type="button"
      className={`rounded-lg bg-transparent font-medium text-violet-700 shadow-sm hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-200 transition-all duration-150 border-violet-700 border-2
    ${padding} ${fontSize}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
