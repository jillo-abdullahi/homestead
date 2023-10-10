import Image from "next/image";

/**
 * component to show the specs of the listing i.e. number of bedrooms, bathrooms, area
 * @param {number} bedrooms - number of bedrooms in the listing
 * @param {number} bathrooms - number of bathrooms in the listing
 * @param {number} area - area of the listing in square feet
 * @returns
 */
interface ListingSpecsProps {
  bedrooms: number;
  bathrooms: number;
  area: number;
}

const ListingSpecs: React.FC<ListingSpecsProps> = ({
  bathrooms,
  bedrooms,
  area,
}) => (
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
      <Image src={"/listingIcons/area.svg"} alt="area" width={20} height={20} />
      <div>{area?.toLocaleString()} sqft</div>
    </div>
  </div>
);

export default ListingSpecs;
