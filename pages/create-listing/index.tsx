import { NextPage } from "next";
import CreateListingContainer from "@/containers/CreateListingContainer";
import Navbar from "@/components/navbar/Navbar";

const CreateListing: NextPage = () => {
  return (
    <main className="bg-gray-100 flex flex-col">
      <div className="flex-grow container">
        <Navbar isOnCreateListingPage={true} />
        <CreateListingContainer />
      </div>
    </main>
  );
};

export default CreateListing;
