import { NextPage } from "next";
import CreateListingForm from "@/containers/CreateListingForm";

const CreateListing: NextPage = () => {
  return (
    <div>
      <main className="bg-gray-100">
        <CreateListingForm />
      </main>
    </div>
  );
};

export default CreateListing;
