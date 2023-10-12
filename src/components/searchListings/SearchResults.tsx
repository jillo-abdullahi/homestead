import { memo, useState } from "react";
import { useRouter } from "next/router";
import PropertyListing from "@/components/listingDetails/PropertyListing";
import ListingsEmptyState from "@/components/listingDetails/ListingsEmptyState";
import { Listing } from "@prisma/client";
import { ListingLoadingState } from "@/components/listingDetails/ListingLoadingState";
import Pagination from "@/components/pagination";
/**
 * component to display search results
 * @param {any} searchResults - search results
 * @param {number} resultsCount - number of results
 * @param {boolean} loading - boolean to indicate if results are loading
 * @param {any} error - error object
 * @param {function} refetch - function to refetch results
 * @param {string} emptyStateTitle - title for empty state
 * @param {string} emptyStateDescription - description for empty state
 * @returns
 */

interface SearchResultsProps {
  searchResults: Listing[];
  resultsCount: number;
  loading?: boolean;
  error?: any;
  refetch: any;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  refetch,
  resultsCount,
  loading,
  error,
  emptyStateTitle,
  emptyStateDescription,
}) => {
  const router = useRouter();
  const isOnHomePage = router.pathname === "/";
  const LISTINGS_PER_PAGE = 10;
  const [pages, setPages] = useState({
    next: 1,
    prev: 0,
  });

  const handleNextPage = () => {
    refetch({
      skip: pages.next * LISTINGS_PER_PAGE,
      take: LISTINGS_PER_PAGE,
    });
    setPages((prevState) => ({
      ...prevState,
      next: prevState.next + 1,
      prev: prevState.prev + 1,
    }));
  };

  const handlePrevPage = () => {
    refetch({
      skip: (pages.prev - 1) * LISTINGS_PER_PAGE,
      take: LISTINGS_PER_PAGE,
    });
    setPages((prevState) => ({
      ...prevState,
      next: prevState.next - 1,
      prev: prevState.prev - 1,
    }));
  };

  const hasNextPage = resultsCount > pages.next * LISTINGS_PER_PAGE;
  const hasPrevPage = pages.prev > 0;

  const currentPage = pages.prev * LISTINGS_PER_PAGE + 1;
  const endPage =
    pages.next * LISTINGS_PER_PAGE > resultsCount
      ? resultsCount
      : pages.next * LISTINGS_PER_PAGE;

  const listingsAvailable = resultsCount > 0;
  const showPagination = resultsCount > LISTINGS_PER_PAGE;
  return (
    <div>
      {isOnHomePage && (
        <>
          <div className="text-2xl font-bold text-gray-700 mt-7">
            Recent Properties
          </div>
          <div className="text-gray-500 text-sm font-medium">
            The surroundings are best for your lifestyle
          </div>
        </>
      )}
      <>
        {listingsAvailable && (
          <div className="text-xs text-violet-700 p-2 rounded-lg border border-gray-200 w-fit mt-2">
            Showing{" "}
            <span>
              {currentPage.toLocaleString()} - {endPage.toLocaleString()}
            </span>{" "}
            of {resultsCount.toLocaleString()}
          </div>
        )}
        <div
          className={`mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${
            listingsAvailable ? "sm:min-h-[400px]" : ""
          }`}
        >
          {listingsAvailable &&
            searchResults.map((listing: Listing) => {
              const { id, location, images, title, price } = listing;
              return (
                <PropertyListing
                  key={id}
                  title={title}
                  location={location}
                  price={price}
                  image={images[0]}
                  id={id}
                />
              );
            })}

          {loading && <ListingLoadingState />}
        </div>
      </>

      {showPagination && (
        <div className="w-full flex items-center justify-center">
          <Pagination
            fetchNextPage={handleNextPage}
            fetchPrevPage={handlePrevPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </div>
      )}

      {!listingsAvailable && !loading && !error && (
        <ListingsEmptyState
          titleText={emptyStateTitle}
          descriptionText={emptyStateDescription}
        />
      )}
    </div>
  );
};

export default memo(SearchResults);
