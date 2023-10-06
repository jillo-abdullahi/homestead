import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchInputField from "@/components/inputFields/SearchInputField";
import SelectInputField from "@/components/inputFields/SelectInputField";
import { SearchState } from "@/types";
/**
 * container component to show search form for listings
 * @returns
 */

const SearchListingsContainer: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    filters: {
      priceRange: {
        min: 0,
        max: 0,
      },
      bedrooms: 0,
      bathrooms: 0,
      area: {
        min: 0,
        max: 0,
      },
    },
  });
  const [searchResults, setSearchResults] = useState();

  const router = useRouter();

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

  console.log({ searchState: searchState.filters });

  // handle search query submit
  const handleSearchQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchState.query) return;

    // TODO: fetchListings(searchState);
  };

  // get search query from url
  const { query } = router.query;

  useEffect(() => {
    if (!query) return;
    setSearchState((prev) => ({ ...prev, query: query as string }));

    // fetch listings with search query
    // TODO: fetchListings(searchState);
  }, [query]);

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
          placeholder="Search listings"
          value={searchState.query}
          handleChange={handleSearchQueryChange}
          handleSubmit={handleSearchQuerySubmit}
        />

        {/* filters  */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <SelectInputField
              value={searchState.filters.bedrooms ?? 0}
              onChange={handleFilterChange}
              options={[1, 2, 3, 4, 5, '6+']}
              label="Bedrooms"
              filterName="bedrooms"
            />
          </div>
          <div className="col-span-3">
            <SelectInputField
              value={searchState.filters.bathrooms ?? 0}
              onChange={handleFilterChange}
              options={[1, 2, 3, 4, 5, '6+']}
              label="Bathrooms"
              filterName="bathrooms"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchListingsContainer;
