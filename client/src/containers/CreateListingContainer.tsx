import { useState, useCallback } from "react";
import Navbar from "@/components/navbar/Navbar";
import ProgressModal from "@/components/progressModal/ProgressModal";
import { ProgressStatus } from "@/components/progressModal/types";
import CreateListingForm from "@/components/createListing/CreateListingForm";
/**
 * create listing container with create listing form.
 * @returns
 */

const CreateListingContainer: React.FC = () => {
  const [newListingDetails, setNewListingDetails] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
  });
  const [openProgressModal, setOpenProgressModal] = useState(false);

  const closeProgressModal = () => {
    //clear form states
    setNewListingDetails({
      title: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
    });

    setOpenProgressModal(false);
  };

  // send to server
  const handleSubmitListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // open progress modal
    setOpenProgressModal(true);
  };

  // handle input changes
  const handleChanges = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewListingDetails((prevState) => ({ ...prevState, [name]: value }));
    },
    []
  );
  return (
    <div className="container">
      <Navbar isLoggedin={true} isOnCreateListingPage={true} />
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="mt-10 sm:mx-auto sm:w-full rounded-lg bg-white p-10">
          <div className="space-y-1 text-left">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-700">
              Create a property listing
            </h2>
            <p className="text-sm leading-5 text-gray-600">
              Fill in the details below to create your listing.
            </p>
          </div>
          {/* create listing form  */}
          <CreateListingForm
            handleSubmitListing={handleSubmitListing}
            handleChanges={handleChanges}
            newListingDetails={newListingDetails}
            formErrors={formErrors}
          />
        </div>
      </div>
      {/* creation progress modal  */}
      <ProgressModal
        open={openProgressModal}
        onClose={closeProgressModal}
        title="Create listing"
        loadingText="Creating listing..."
        successText="Listing created successfully!"
        errorText="An error occurred while creating the listing."
        progressStatus={ProgressStatus.Error}
      />
    </div>
  );
};

export default CreateListingContainer;
