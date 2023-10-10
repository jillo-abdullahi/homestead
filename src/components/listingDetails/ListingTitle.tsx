import { MapPinIcon } from "@heroicons/react/24/outline";
/**
 * component for displaying the title and location of a listing
 * @param {string} title - title of the listing
 * @param {string} location - location of the listing
 */

interface ListingTitleProps {
  title: string;
  location: string;
}

const ListingTitle: React.FC<ListingTitleProps> = ({ title, location }) => (
  <div className="space-y-2">
    <div className="text-gray-800 text-xl font-medium">{title}</div>
    <div className="text-gray-500 text-sm flex items-center justify-start">
      <MapPinIcon className="w-5 h-5" aria-hidden="true" />
      {location}
    </div>
  </div>
);

export default ListingTitle;
