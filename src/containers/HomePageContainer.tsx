import { useQuery } from "@apollo/client";
import Landing from "@/components/landing";
import { GET_ALL_LISTINGS } from "@/graph/queries";
import SearchResults from "@/components/searchListings/SearchResults";
/**
 * Home page container.
 * @returns
 */
const HomePageContainer = () => {
  // fetch listings
  const { data, loading, error, refetch } = useQuery(GET_ALL_LISTINGS);

  return (
    <div className="w-full">
      <Landing />
      <SearchResults
        refetch={refetch}
        searchResults={data?.listings}
        resultsCount={data?.getListingsCount}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default HomePageContainer;
