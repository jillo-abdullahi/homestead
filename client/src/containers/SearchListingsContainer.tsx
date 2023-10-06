import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { IconDimensions } from "@tabler/icons-react";
import SearchInputField from "@/components/inputFields/SearchInputField";
import SelectInputField from "@/components/inputFields/SelectInputField";
import DropdownButton from "@/components/buttons/DropdownButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { SearchState } from "@/types";

/**
 * container component to show search form for listings
 * @returns
 */

const SearchListingsContainer: React.FC = () => {
  const router = useRouter();
  const { query } = router.query;

  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    filters: {},
  });
  const [searchResults, setSearchResults] = useState();

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

    // TODO: fetchFilteredResults();
  };

  const fetchFilteredResults = async () => {
    //TODO: fetch filtered listings
    console.log("fetching filtered listings");
  };

  useEffect(() => {
    if (!query) return;
    setSearchState((prev) => ({ ...prev, query: query as string }));

    // fetch listings with search query
    // TODO: fetchFilteredResults();
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
          placeholder="Search location, town, or estate"
          value={searchState.query}
          handleChange={handleSearchQueryChange}
          handleSubmit={handleSearchQuerySubmit}
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
              <PrimaryButton onClick={fetchFilteredResults}>
                Search
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchListingsContainer;
