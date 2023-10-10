import { IconMinimize, IconMaximize } from "@tabler/icons-react";

/**
 * Full screen toggle button for the image gallery
 * @prop {boolean} isFullscreen - whether image is in full screen or not
 * @prop {function} onClick - function to be called when button is clicked
 * @returns
 */

interface FullScreenButtonProps {
  isFullscreen: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const FullScreenButton: React.FC<FullScreenButtonProps> = ({
  onClick,
  isFullscreen,
}) => {
  // icon styles
  const iconStyles =
    "w-10 h-10 transition-all duration-200 text-gray-100 hover:text-gray-200 hover:scale-110 transform";
  return (
    <button
      onClick={onClick}
      className="image-gallery-icon image-gallery-fullscreen-button"
    >
      {isFullscreen ? (
        <IconMinimize className={iconStyles} />
      ) : (
        <IconMaximize className={iconStyles} />
      )}
    </button>
  );
};

export default FullScreenButton;
