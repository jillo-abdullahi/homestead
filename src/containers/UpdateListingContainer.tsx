import { useState, useCallback, useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import ProgressModal from "@/components/progressModal/ProgressModal";
import { ProgressStatus } from "@/components/progressModal/types";
import CreateUpdateListingForm from "@/components/createUpdateListing/CreateUpdateListingForm";
import uploadImagesToCloudinary from "@/utils/uploadImages";
import { getLoggedInUser } from "@/utils/saveLoggedInUser";
import { GET_LISTING } from "@/graph/queries";
import {
  REQUEST_CLOUDINARY_SIGNATURE,
  UPDATE_LISTING,
} from "@/graph/mutations";

/**
 * create listing container with create listing form.
 * @returns
 */

const UpdateListingContainer: React.FC = () => {
  const router = useRouter();
  const { listingId } = router.query;

  const [updatedListingDetails, setUpdatedListingDetails] = useState({
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
  const [token, setToken] = useState("");
  const [removeImages, setRemoveImages] = useState<string[]>([]);

  // image states
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [listingImages, setListingImages] = useState<string[]>([]);

  // get signature and timestamp from server for secure image upload
  const [getSignature] = useMutation(REQUEST_CLOUDINARY_SIGNATURE, {
    variables: {
      timestamp: moment().unix().toString(),
      folder: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER,
    },
  });

  // mutation to update listing
  const [updateListing, { data }] = useMutation(UPDATE_LISTING, {
    context: {
      headers: {
        authorization: token ?? "",
      },
    },
  });

  // get listing details if on update listing page
  // TODO: Handle loading and error
  const {
    data: listingDetails,
    loading,
    error,
  } = useQuery(GET_LISTING, {
    variables: { listingId },
    skip: !listingId,
  });

  // set default state if on update listing page
  useEffect(() => {
    if (listingDetails?.listing) {
      const {
        title,
        location,
        price,
        bedrooms,
        bathrooms,
        description,
        area,
        images,
      } = listingDetails?.listing;
      setUpdatedListingDetails({
        title,
        location,
        price: String(price),
        bedrooms: String(bedrooms),
        bathrooms: String(bathrooms),
        description,
        area: String(area),
      });

      setListingImages(images ?? []);
    }
  }, [listingDetails?.listing]);

  // get token from local storage
  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      const { token } = user;
      setToken(token);
    }
  }, []);

  const closeProgressModal = () => {
    //clear form states
    setUpdatedListingDetails({
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
            const imagesUploaded = results.map(
              (result) => `${result.secure_url}?pid=${result.public_id}`
            );

            // join selected images and listing images
            const images = [...imagesUploaded, ...listingImages];

            // create listing
            const {
              bedrooms,
              bathrooms,
              area,
              description,
              location,
              price,
              title,
            } = updatedListingDetails;
            updateListing({
              variables: {
                updateListingId: listingId,
                location,
                price: Number(price) || null,
                title,
                description: description || null,
                bedrooms: Number(bedrooms) || null,
                bathrooms: Number(bathrooms) || null,
                area: Number(area) || null,
                images,
                removeImages,
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
        setUpdatedListingDetails((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    },
    []
  );

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      <div className="mt-10 sm:mx-auto sm:w-full rounded-lg bg-white p-10">
        <div className="space-y-1 text-left">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Update property listing
          </h2>
          <p className="text-sm leading-5 text-gray-600">
            Fill in the details below to update your listing
          </p>
        </div>
        {/* create listing form  */}
        <CreateUpdateListingForm
          handleSubmitListing={handleSubmitListing}
          handleChanges={handleChanges}
          listingDetails={updatedListingDetails}
          listingImages={listingImages}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          setListingImages={setListingImages}
          setRemoveImages={setRemoveImages}
        />
      </div>
      {/* creation progress modal  */}
      <ProgressModal
        open={openProgressModal}
        onClose={closeProgressModal}
        title="Update listing"
        loadingText={
          isUploadingImages ? "Uploading images" : "Finalizing listing"
        }
        successText="Listing successfully updated!"
        errorText={errorText || "An error occurred while updating the listing."}
        progressStatus={progressStatus}
        listingId={data?.updateListing.id}
      />
    </div>
  );
};

export default UpdateListingContainer;
