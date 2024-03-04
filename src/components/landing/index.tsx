import { useState } from "react";
import { useRouter } from "next/router";
import SearchInputField from "@/components/searchListings/SearchInputField";

/**
 * landing page component.
 * top section of the page with a welcome message and search bar.
 * @returns
 */

const Landing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // handle search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // handle search query submit
  const handleSearchQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) return;

    // navigate to search page with search query
    router.push(`/search-listings?query=${searchQuery}`);
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div
        className="w-full flex justify-start items-center rounded-xl p-10 bg-violet-100 h-[30rem]"
        style={{
          background: "url('/bg-intro.jpeg') no-repeat center center",
          backgroundSize: "cover",
        }}
      >
        <div className="col-span-6 h-full flex flex-col items-start justify-center w-full md:w-1/2">
          <div className="text-4xl font-bold text-gray-700 mb-4">
            Find your dream home with{" "}
            <span className="text-violet-700">Homestead</span>.
          </div>

          <div className="mt-5 w-full">
            <SearchInputField
              placeholder="Search for a location, town, or estate"
              value={searchQuery}
              handleChange={handleSearchQueryChange}
              handleSubmit={handleSearchQuerySubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
