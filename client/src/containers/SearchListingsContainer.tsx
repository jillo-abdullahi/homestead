import { useRouter } from "next/router";
/**
 * container component to show search form for listings
 * @returns
 */

const SearchListingsContainer: React.FC = () => {
  const router = useRouter();

  // get search query from url
  const { query } = router.query;

  return (
    <div className="">
     
    </div>
  );
};

export default SearchListingsContainer;
