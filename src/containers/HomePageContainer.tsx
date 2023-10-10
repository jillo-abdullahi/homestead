import { useQuery } from "@apollo/client";
import Landing from "@/components/Landing";
import ListingsEmptyState from "@/components/listingDetails/ListingsEmptyState";
import PropertyListing from "@/components/PropertyListing";
import { listings } from "@/utils/dummyListings";
import { ListingLoadingState } from "@/components/listingDetails/ListingLoadingState";
import { GET_ALL_LISTINGS } from "@/graph/queries";
import { Listing } from "@/types";
/**
 * Home page container.
 * @returns
 */
const HomePageContainer = () => {
  // fetch listings
  const { data, loading, error } = useQuery(GET_ALL_LISTINGS);

  // console.log({ data, loading, error });

  // console.log("LISTINGS", data?.listings)

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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.listings.length &&
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

      {data?.listings.length === 0 && !loading && !error && (
        <ListingsEmptyState />
      )}
    </div>
  );
};

export default HomePageContainer;
