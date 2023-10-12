import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { FILTER_LISTINGS } from "@/graph/queries";
import { useRouter } from "next/router";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { IconDimensions } from "@tabler/icons-react";
import SearchInputField from "@/components/searchListings/SearchInputField";
import SelectInputField from "@/components/searchListings/SelectInputField";
import DropdownButton from "@/components/buttons/DropdownButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import SearchResults from "@/components/searchListings/SearchResults";
import { SearchState } from "@/types";

/**
 * container component to show search form for listings
 * @returns
 */
const SearchListingsContainer: React.FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const client = useApolloClient();

  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    filters: {},
  });
  const [searchResults, setSearchResults] = useState([]);
  const [listingsFound, setListingsFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  /**
   * function to fetch listings
   * @param pagination - pagination object with skip and take
   * @param query - search query used for initial search
   * @returns void
   */
  const fetchListings = async (
    pagination: { skip: number; take: number },
    query?: string
  ) => {
    setLoading(true);
    const { bedrooms, bathrooms, priceRange, area } = searchState.filters;
    try {
      const result = await client.query({
        query: FILTER_LISTINGS,

        variables: {
          // pagination
          ...pagination,

          // filters
          searchQuery: query || searchState.query,
          bathrooms,
          bedrooms,
          maxArea: area?.max,
          maxPrice: priceRange?.max,
          minArea: area?.min,
          minPrice: priceRange?.min,
        },
      });
      const { data } = result;
      setSearchResults(data.listings);
      setListingsFound(data.getListingsCount);
      setLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    // only want to run this on initial render
    // manually fetch listings when filters are changed afterwards
    if (!query) return;
    fetchListings({ skip: 0, take: 10 }, query as string);
  }, [query]);

  // handle search query and filters change
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchState((prev) => ({ ...prev, query: value }));
  };

  const handleFilterChange = (
    filterName: keyof SearchState["filters"],
    value: any
  ) => {
    setSearchState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterName]: value,
      },
    }));
  };

  // update search query when query param changes
  useEffect(() => {
    if (!query) return;
    setSearchState((prev) => ({ ...prev, query: query as string }));
  }, [query]);

  // clear filters
  const clearFilters = () => {
    setSearchState((prevState) => ({ ...prevState, filters: {} }));
  };

  return (
    <>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-700 mt-7">
          Search listings
        </div>
        <div className="text-gray-500 text-sm font-medium">
          Use the provided filters to narrow down your search.
        </div>
      </div>
      {/* search form and filters  */}
      <div className="w-full border border-gray-100 rounded-xl p-6 space-y-4">
        <SearchInputField
          placeholder="Search location, title, or description"
          value={searchState.query}
          handleChange={handleSearchQueryChange}
        />

        {/* filters  */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="">
            <SelectInputField
              value={searchState.filters.bedrooms ?? 0}
              onChange={handleFilterChange}
              options={[1, 2, 3, 4, 5, "6+"]}
              label="Bedrooms"
              filterName="bedrooms"
            />
          </div>
          <div className="">
            <SelectInputField
              value={searchState.filters.bathrooms ?? 0}
              onChange={handleFilterChange}
              options={[1, 2, 3, 4, 5, "6+"]}
              label="Bathrooms"
              filterName="bathrooms"
            />
          </div>
          <div className="">
            <DropdownButton
              onChange={handleFilterChange}
              filter={searchState.filters.priceRange ?? { min: 0, max: 0 }}
              filterName="priceRange"
              label="Price range(USD)"
              icon={<CurrencyDollarIcon className="text-gray-500 w-4 h-4" />}
            />
          </div>
          <div className="">
            <DropdownButton
              onChange={handleFilterChange}
              filter={searchState.filters.area ?? { min: 0, max: 0 }}
              filterName="area"
              label="Property area(sqft)"
              icon={<IconDimensions className="text-gray-500 w-4 h-4" />}
            />
          </div>
        </div>
        {/* buttons to clear filters and search listings  */}
        <div className="flex items-center justify-center sm:justify-end space-x-4 mt-4">
          <div className="flex items-center justify-end">
            <div className="min-w-[120px]">
              <SecondaryButton onClick={clearFilters}>
                Clear filters
              </SecondaryButton>
            </div>
            <div className="min-w-[120px]">
              <PrimaryButton
                onClick={() => fetchListings({ skip: 0, take: 10 })}
              >
                Search
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SearchResults
          searchResults={searchResults}
          refetch={fetchListings}
          resultsCount={listingsFound}
          loading={loading}
          error={error}
          emptyStateDescription="Try changing your search query or filters."
          emptyStateTitle="No listings found"
        />
      </div>
    </>
  );
};

export default SearchListingsContainer;
