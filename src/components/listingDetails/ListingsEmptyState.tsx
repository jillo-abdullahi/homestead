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
  titleText,
  descriptionText,
}) => (
  <div className="text-center py-20 border border-gray-100 rounded-lg mt-4">
    <div className="text-center w-full flex justify-center">
      <InboxIcon className="w-6 h-6 text-violet-700" />
    </div>
    <h3 className="mt-2 text-sm font-semibold text-gray-900">
      {titleText ? titleText : "No listings available"}
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      {descriptionText
        ? descriptionText
        : "Recently added listings will appear here."}
    </p>
  </div>
);

export default ListingsEmptyState;
