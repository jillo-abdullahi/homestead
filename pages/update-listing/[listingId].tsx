/**
 * update listing page
 */

import { NextPage } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import UpdateListingContainer from "@/containers/UpdateListingContainer";

const UpdateListing: NextPage = () => {
  return (
    <main>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-grow container">
          <Navbar />
          <UpdateListingContainer />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default UpdateListing;
