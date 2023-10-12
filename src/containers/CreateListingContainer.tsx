import { useState, useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_LISTING } from "@/graph/mutations";
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
    const user = localStorage.getItem("homesteaduser");
    if (user) {
      const { token } = JSON.parse(user);
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

  // handle image uploads
  const handleImageUpload = async () => {
    setProgressStatus(ProgressStatus.InProgress);
    setIsUploadingImages(true);
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME!;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;
    const UPLOAD_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER!;

    const uploadPromises = selectedImages.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", UPLOAD_FOLDER);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        return response.json();
      } catch (error) {
        throw new Error("Image upload failed");
      }
    });

    const results = await Promise.all(uploadPromises);
    return results;
  };

  // send to server
  const handleSubmitListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // open progress modal
    setOpenProgressModal(true);

    // upload images first
    handleImageUpload()
      .then((results) => {
        setIsUploadingImages(false);
        // extract image urls from results
        const images = results.map((result) => result.secure_url);

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
            price: Number(price),
            title,
            description: description || null,
            bedrooms: Number(bedrooms) || null,
            bathrooms: Number(bathrooms) || null,
            area: Number(area),
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
