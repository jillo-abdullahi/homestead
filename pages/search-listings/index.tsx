import { NextPage } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import SearchListingsContainer from "@/containers/SearchListingsContainer";

const SearchListings: NextPage = () => {
  return (
    <main>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container">
          <Navbar />
          <SearchListingsContainer />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default SearchListings;
