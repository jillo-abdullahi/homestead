import Image from "next/image";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import SecondaryButton from "./buttons/SecondaryButton";

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
  return (
    <div className="w-full rounded-lg p-5 grid grid-cols-12 gap-x-2 shadow-md max-w-3xl border">
      <div
        className="bg-violet-100 col-span-4 w-48 h-48 rounded-md"
        style={{
          backgroundImage: `url(${image}) no-repeat center center`,
          backgroundSize: "cover",
          backgroundColor: "#F3F4F6",
        }}
      ></div>
      <div className="col-span-5 flex flex-col space-y-6 justify-center">
        <div className="space-y-2">
          <div className="text-gray-700 text-xl font-medium">{title}</div>
          <div className="text-gray-500 text-sm flex items-center justify-start">
            <MapPinIcon className="w-5 h-5" aria-hidden="true" />
            {location}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-start space-x-4">
            <div className="text-gray-700 text-sm flex items-center justify-start space-x-2">
              <Image
                src={"/listingIcons/bedroom.svg"}
                alt="bed"
                width={20}
                height={20}
              />
              <div>{bedrooms} beds</div>
            </div>
            <div className="text-gray-700 text-sm flex items-center justify-start space-x-2">
              <Image
                src={"/listingIcons/bathroom.svg"}
                alt="bath"
                width={20}
                height={20}
              />
              <div>{bathrooms} baths</div>
            </div>
            <div className="text-gray-700 text-sm flex items-center justify-start space-x-2">
              <Image
                src={"/listingIcons/area.svg"}
                alt="area"
                width={20}
                height={20}
              />
              <div>{area?.toLocaleString()} sqft</div>
            </div>
          </div>
          <div className="">
            <div className="text-gray-500 text-sm">Price:</div>
            <div className="text-2xl font-bold">${price?.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="col-span-3 h-full flex items-center justify-center">
        <SecondaryButton>
          <div className="flex items-center justify-center space-x-2">
            <BuildingOffice2Icon className="h-5 w-5" aria-hidden="true" />
            <span>View</span>
          </div>
        </SecondaryButton>
      </div>
    </div>
  );
};

export default PropertyListing;
