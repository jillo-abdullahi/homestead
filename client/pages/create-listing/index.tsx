import { NextPage } from "next";
import CreateListingContainer from "@/containers/CreateListingContainer";

const CreateListing: NextPage = () => {
  return (
    <div>
      <main className="bg-gray-100">
        <CreateListingContainer />
      </main>
    </div>
  );
};

export default CreateListing;
