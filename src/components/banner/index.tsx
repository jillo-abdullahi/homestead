import { XMarkIcon } from "@heroicons/react/20/solid";

/**
 * banner component to show on top of the page.
 * @param {string} text - text to display.
 * @param {function} [dismiss] - function to dismiss the banner.
 */

interface BannerProps {
  text: string | React.ReactNode;
  dismiss?: () => void;
}

const Banner: React.FC<BannerProps> = ({ text, dismiss }) => {
  return (
    <div className="flex items-center gap-x-6 bg-yellow-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 rounded-b-lg">
      <p
        className={`text-sm leading-6 text-white ${
          !dismiss ? "flex w-full justify-center" : ""
        }`}
      >
        {text}
      </p>
      {dismiss && (
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            onClick={dismiss}
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Banner;
