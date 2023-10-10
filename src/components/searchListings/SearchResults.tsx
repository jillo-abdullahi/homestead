import { memo } from "react";
import { listings } from "@/utils/dummyListings";
import PropertyListing from "@/components/PropertyListing";
import ListingsEmptyState from "@/components/listingDetails/ListingsEmptyState";
/**
 * component to display search results
 * @param {any} searchResults - search results
 * @returns
 */

interface SearchResultsProps {
  searchResults: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div>
      {searchResults.length > 0 && (
        <div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {listings.map(
              ({
                id,
                location,
                images,
                bathrooms,
                bedrooms,
                area,
                title,
                price,
              }) => (
                <PropertyListing
                  key={id}
                  title={title}
                  location={location}
                  price={price}
                  image={images[0].original}
                  id={id}
                  bedrooms={bedrooms}
                  bathrooms={bathrooms}
                  area={area}
                />
              )
            )}
          </div>
        </div>
      )}

      {searchResults.length === 0 && (
        <ListingsEmptyState
          titleText="No listings found"
          descriptionText="Try adjust your search criteria"
        />
      )}
    </div>
  );
};

export default memo(SearchResults);
