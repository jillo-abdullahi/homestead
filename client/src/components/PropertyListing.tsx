import { useRouter } from "next/router";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";

/**
 * component that displays a single property listing
 * @param {string} title - title of the property
 * @param {string} location - location of the property
 * @param {number} price - price of the property
 * @param {string} image - image of the property
 * @param {string} id - id of the property
 * @param {number} bedrooms - number of bedrooms in the property
 * @param {number} bathrooms - number of bathrooms in the property
 * @param {number} area - area of the property in square feet
 * @returns
 */

interface PropertyListingProps {
  title: string;
  location?: string;
  price?: number;
  image?: string;
  id?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

const PropertyListing: React.FC<PropertyListingProps> = ({
  title,
  location,
  price,
  image,
  id,
  bedrooms,
  bathrooms,
  area,
}) => {
  const router = useRouter();
  // view full listing details
  const handleViewListing = () => {
    if (id) {
      router.push(`/listing/${id}`);
    }
  };
  return (
    <button
      onClick={handleViewListing}
      className="flex flex-col items-center justify-between h-[12rem] rounded-lg bg-white border border-gray-200 p-2 transition-all duration-150 hover:border-2 hover:border-violet-700"
    >
      <div
        className="rounded-md w-full h-1/2"
        style={{
          background: `url('${image}') no-repeat center center`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="space-y-1 w-full h-[4.5rem] text-left">
        <div className="text-gray-700 text-xs font-medium text-left line-clamp-2">
          {title}
        </div>
        <div className="text-violet-700 font-bold text-sm line-clamp-1">
          ${price?.toLocaleString()}
        </div>
        <div className="text-gray-500 text-xs font-medium flex items-center justify-start space-x-1 mb-1">
          <MapPinIcon className="w-3 h-3" aria-hidden="true" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </div>
    </button>
  );
};

export default PropertyListing;
