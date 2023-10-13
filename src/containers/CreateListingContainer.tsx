import { useState, useCallback, useEffect } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { CREATE_LISTING } from "@/graph/mutations";
import ProgressModal from "@/components/progressModal/ProgressModal";
import { ProgressStatus } from "@/components/progressModal/types";
import CreateUpdateListingForm from "@/components/createUpdateListing/CreateUpdateListingForm";
import uploadImagesToCloudinary from "@/utils/uploadImages";
import { getLoggedInUser } from "@/utils/saveLoggedInUser";
import { REQUEST_CLOUDINARY_SIGNATURE } from "@/graph/mutations";

/**
 * create listing container with create listing form.
 * @returns
 */

const CreateListingContainer: React.FC = () => {
  // get signature and timestamp from server for secure image upload
  const [getSignature] = useMutation(REQUEST_CLOUDINARY_SIGNATURE, {
    variables: {
      timestamp: moment().unix().toString(),
      folder: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER,
    },
  });

  const [newListingDetails, setNewListingDetails] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    area: "",
  });

  const [openProgressModal, setOpenProgressModal] = useState(false);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus | null>(
    null
  );
  const [errorText, setErrorText] = useState("");
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [token, setToken] = useState("token");

  // image states
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // get token from local storage
  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      const { token } = user;
      setToken(token);
    }
  }, []);

  // mutation to create listing
  const [createListing, { data }] = useMutation(CREATE_LISTING, {
    context: {
      headers: {
        authorization: token ?? "",
      },
    },
  });

  const closeProgressModal = () => {
    //clear form states
    setNewListingDetails({
      title: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      area: "",
    });
    setErrorText("");
    setOpenProgressModal(false);
  };

  // send to server
  const handleSubmitListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // open progress modal
    setOpenProgressModal(true);
    setProgressStatus(ProgressStatus.InProgress);
    setIsUploadingImages(true);

    // get signature and timestamp from server
    getSignature()
      .then((result) => {
        const { signature, timestamp } = result.data.requestUploadSignature;
        // upload images first
        uploadImagesToCloudinary(selectedImages, signature, timestamp)
          .then((results) => {
            setIsUploadingImages(false);
            // extract image urls from results
            // concat this with the public id - we'll use this to delete the images if needed
            const images = results.map(
              (result) => `${result.secure_url}?pid=${result.public_id}`
            );

            // create listing
            const {
              bedrooms,
              bathrooms,
              area,
              description,
              location,
              price,
              title,
            } = newListingDetails;
            createListing({
              variables: {
                location,
                price: Number(price) || null,
                title,
                description: description || null,
                bedrooms: Number(bedrooms) || null,
                bathrooms: Number(bathrooms) || null,
                area: Number(area) || null,
                images,
              },
              onCompleted: () => {
                setProgressStatus(ProgressStatus.Completed);
              },
              onError: (error) => {
                const { message } = error;
                if (message.includes("not authenticated")) {
                  setErrorText("You are not authorized to perform this action");
                }
                setProgressStatus(ProgressStatus.Error);
              },
            });
          })
          .catch((error) => {
            setProgressStatus(ProgressStatus.Error);
            setErrorText(error.message);
          });
      })
      .catch((error) => {
        setProgressStatus(ProgressStatus.Error);
        setErrorText(error.message);
      });
  };

  // handle input changes
  const handleChanges = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if ("value" in e.target) {
        const { name, value } = e.target;
        setNewListingDetails((prevState) => ({ ...prevState, [name]: value }));
      }
    },
    []
  );

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center pb-10">
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
        <CreateUpdateListingForm
          handleSubmitListing={handleSubmitListing}
          handleChanges={handleChanges}
          listingDetails={newListingDetails}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </div>
      {/* creation progress modal  */}
      <ProgressModal
        open={openProgressModal}
        onClose={closeProgressModal}
        title="Create listing"
        loadingText={
          isUploadingImages ? "Uploading images" : "Finalizing listing"
        }
        successText="Listing created successfully!"
        errorText={errorText || "An error occurred while creating the listing."}
        progressStatus={progressStatus}
        listingId={data?.createListing.id}
      />
    </div>
  );
};

export default CreateListingContainer;
