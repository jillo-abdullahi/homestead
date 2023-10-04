import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

/**
 * left navigation button for image gallery
 * @param {function} onClick - function to be called when button is clicked
 * @param {boolean} disabled - whether button is disabled or not
 * @param {boolean} isLeftButton - whether button is left or right
 * @returns
 */

interface NavButtonProps {
  onClick: React.MouseEventHandler<HTMLElement>;
  disabled: boolean;
  isLeftButton?: boolean;
}
const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  disabled,
  isLeftButton = true,
}) => {
  // icon styles
  const iconStyles = "w-8 h-8 text-gray-100";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`image-gallery-icon ${
        isLeftButton ? "image-gallery-left-nav" : "image-gallery-right-nav"
      }`}
    >
      <div className="transition-all duration-200 w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center hover:scale-110 transform">
        {isLeftButton ? (
          <ChevronLeftIcon className={iconStyles} />
        ) : (
          <ChevronRightIcon className={iconStyles} />
        )}
      </div>
    </button>
  );
};

export default NavButton;
