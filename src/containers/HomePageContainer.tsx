import { useState } from "react";
import { useQuery } from "@apollo/client";
import Landing from "@/components/landing";
import ListingsEmptyState from "@/components/listingDetails/ListingsEmptyState";
import PropertyListing from "@/components/listingDetails/PropertyListing";
import { ListingLoadingState } from "@/components/listingDetails/ListingLoadingState";
import { GET_ALL_LISTINGS } from "@/graph/queries";
import { Listing } from "@/types";
import Pagination from "@/components/pagination";
/**
 * Home page container.
 * @returns
 */
const HomePageContainer = () => {
  const LISTINGS_PER_PAGE = 10;
  const [pages, setPages] = useState({
    next: 1,
    prev: 0,
  });
  // fetch listings
  const { data, loading, error, refetch } = useQuery(GET_ALL_LISTINGS);

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

  const hasNextPage = data?.getListingsCount > pages.next * LISTINGS_PER_PAGE;
  const hasPrevPage = pages.prev > 0;
  const currentPage = pages.prev * LISTINGS_PER_PAGE + 1;

  const endPage =
    pages.next * LISTINGS_PER_PAGE > data?.getListingsCount
      ? data?.getListingsCount
      : pages.next * LISTINGS_PER_PAGE;

  return (
    <div className="w-full">
      <Landing />
      <>
        <div className="text-2xl font-bold text-gray-700 mt-7">
          Recent Properties
        </div>
        <div className="text-gray-500 text-sm font-medium">
          The surroundings are best for your lifestyle
        </div>
      </>

      <>
        <div className="text-xs text-violet-700 p-2 rounded-full border border-gray-200 w-fit mt-2">
          Showing{" "}
          {currentPage === endPage ? (
            <span>{endPage.toLocaleString()}</span>
          ) : (
            <span>
              {currentPage.toLocaleString()} - {endPage.toLocaleString()}
            </span>
          )}{" "}
          of {data?.getListingsCount.toLocaleString()}
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[400px]">
          {data?.listings.length > 0 &&
            data?.listings.map((listing: Listing) => {
              const {
                id,
                location,
                images,
                bathrooms,
                bedrooms,
                area,
                title,
                price,
              } = listing;
              return (
                <PropertyListing
                  key={id}
                  title={title}
                  location={location}
                  price={price}
                  image={images[0]}
                  id={id}
                  bedrooms={bedrooms}
                  bathrooms={bathrooms}
                  area={area}
                />
              );
            })}

          {loading && <ListingLoadingState />}
        </div>
      </>

      {data?.listings.length > 0 && (
        <div className="w-full flex items-center justify-center">
          <Pagination
            fetchNextPage={handleNextPage}
            fetchPrevPage={handlePrevPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </div>
      )}

      {data?.listings.length === 0 && !loading && !error && (
        <ListingsEmptyState />
      )}
    </div>
  );
};

export default HomePageContainer;
