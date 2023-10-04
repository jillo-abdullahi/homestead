import { useRouter } from "next/router";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import ListingPrice from "@/components/listingDetails/ListingPrice";
import ListingSpecs from "@/components/listingDetails/ListingSpecs";
import ListingTitle from "@/components/listingDetails/ListingTitle";

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
    <div className="w-full rounded-lg p-5 grid grid-cols-12 gap-x-2 shadow-md max-w-3xl border">
      {!image && (
        <div className="col-span-4 w-[200px] h-[200px] rounded-md bg-gray-300"></div>
      )}
      {image && (
        <img
          src={image}
          alt="property image"
          width={200}
          className="col-span-4 rounded-md my-auto"
        />
      )}
      <div className="col-span-5 flex flex-col space-y-6 justify-center">
        {/* title and location  */}
        <ListingTitle title={title} location={location ?? ""} />

        <div className="space-y-3">
          {/* listing specs  */}
          <ListingSpecs
            bedrooms={bedrooms ?? 0}
            bathrooms={bathrooms ?? 0}
            area={area ?? 0}
          />

          {/* price  */}
          {<ListingPrice price={price ?? 0} />}
        </div>
      </div>
      <div className="col-span-3 h-full flex items-center justify-center">
        <SecondaryButton onClick={handleViewListing}>
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
