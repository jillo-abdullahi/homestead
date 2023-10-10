import { InboxIcon } from "@heroicons/react/24/outline";

/**
 * component to show on the home page or search page when there are no listings
 * @param {string} titleText - title text
 * @param {string} descriptionText - description text
 * @returns
 */

interface ListingsEmptyStateProps {
  titleText?: string;
  descriptionText?: string;
}
const ListingsEmptyState: React.FC<ListingsEmptyStateProps> = ({
  titleText = "No listings available",
  descriptionText = "Recently added listings will appear here.",
}) => (
  <div className="text-center py-20 border border-gray-100 rounded-lg mt-4">
    <div className="text-center w-full flex justify-center">
      <InboxIcon className="w-6 h-6 text-violet-700" />
    </div>
    <h3 className="mt-2 text-sm font-semibold text-gray-900">{titleText}</h3>
    <p className="mt-1 text-sm text-gray-500">{descriptionText}</p>
  </div>
);

export default ListingsEmptyState;
