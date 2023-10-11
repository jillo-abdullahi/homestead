import {
  IconPhotoX,
  IconPhoto,
  IconExclamationCircle,
} from "@tabler/icons-react";
import Image from "next/image";

interface ListingDetailsEmptyStateProps {
  error?: boolean;
}

/**
 * component to show loading or error state on the listing details page
 * @param {boolean} error - if true, shows error state else shows loading state
 * @returns
 */

export const ListingDetailsEmptyState: React.FC<
  ListingDetailsEmptyStateProps
> = ({ error }) => (
  <div
    className={`relative flex flex-col items-center justify-center md:grid md:grid-cols-12 gap-6 mt-10 sm:mt-28 ${
      !error ? "animate-pulse" : ""
    }`}
  >
    {
      <div className={`w-full md:col-span-6  ${error ? "blur-sm" : ""}`}>
        <div className="w-full min-h-[20rem] min-h-md flex items-center justify-center bg-gray-200 rounded-lg">
          {error ? (
            <IconPhotoX size={32} className="text-gray-400" />
          ) : (
            <IconPhoto size={32} className="text-gray-400" />
          )}
        </div>
      </div>
    }
    <div
      className={`w-full h-full md:col-span-6 space-y-4 flex flex-col items-start justify-center ${
        error ? "blur-sm" : ""
      }`}
    >
      <>
        <div className="w-3/4 h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-1/2 h-6 bg-gray-200 rounded-lg"></div>
      </>

      <div className="w-3/4 h-24 bg-gray-200 rounded-lg"></div>
      <div className="w-3/4 h-6 bg-gray-200 rounded-lg"></div>
      <div className="w-1/2 h-6 bg-gray-200 rounded-lg"></div>
    </div>

    {error && (
      <div className="absolute  w-full h-full flex items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center space-y-2">
          <Image src="/error.svg" width={150} height={150} alt="error" />
          <span className="text-gray-800 font-medium">
            Something went wrong.
            <br /> We couldn't find that listing.
          </span>
        </div>
      </div>
    )}
  </div>
);
