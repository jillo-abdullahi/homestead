import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

/**
 * component that displays pagination
 * @param {function} fetchNextPage - function to fetch next page
 * @param {function} fetchPrevPage - function to fetch previous page
 * @param {boolean} hasNextPage - boolean to indicate if there is a next page
 * @param {boolean} hasPrevPage - boolean to indicate if there is a previous page
 * @returns
 */

interface PaginationProps {
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  fetchNextPage,
  fetchPrevPage,
  hasNextPage,
  hasPrevPage,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-6 rounded-full border-gray-200 border p-2">
      <button
        onClick={fetchPrevPage}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500  ${
          !hasPrevPage
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-300 transition-all duration-150"
        }`}
        disabled={!hasPrevPage}
      >
        <IconChevronLeft size={20} className="text-violet-700" />
      </button>
      <button
        onClick={fetchNextPage}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-200  ${
          !hasNextPage
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-300 transition-all duration-150"
        }`}
        disabled={!hasNextPage}
      >
        <IconChevronRight size={20} className="text-violet-700" />
      </button>
    </div>
  );
};

export default Pagination;
