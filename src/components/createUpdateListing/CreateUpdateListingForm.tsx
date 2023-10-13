import { useState } from "react";
import { useRouter } from "next/router";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";
import IsRequiredLabel from "@/components/inputFields/IsRequiredLabel";
import ImageUploader from "@/components/imageUploader/ImageUploader";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import {
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { IconBath, IconBed, IconDimensions } from "@tabler/icons-react";
import { NewListing } from "@/components/createUpdateListing/types";

/**
 * form to submit new listing details
 * @param {function} handleSubmitListing - function to submit listing details
 * @param {function} handleChanges - function to handle input changes
 * @param {NewListing} listingDetails - new/updated listing details
 * @param {string[]} listingImages - listing images - existing listing images if on update listing page
 * @param {File[]} selectedImages - selected images to upload
 * @param {React.Dispatch<React.SetStateAction<File[]>>} setSelectedImages - function to set selected images
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setListingImages - function to set listing images
 * @returns
 */

interface CreateUpdateListingFormProps {
  handleSubmitListing: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChanges: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  listingDetails: NewListing;
  listingImages?: string[];
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  setListingImages?: React.Dispatch<React.SetStateAction<string[]>>;
  setRemoveImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateUpdateListingForm: React.FC<CreateUpdateListingFormProps> = ({
  handleSubmitListing,
  handleChanges,
  listingDetails,
  listingImages,
  selectedImages,
  setSelectedImages,
  setListingImages,
  setRemoveImages,
}) => {
  const [isFileSizeError, setIsFileSizeError] = useState(false);
  const router = useRouter();
  const isOnCreateListingPage = router.pathname === "/create-listing";

  return (
    <form className="mt-6" onSubmit={handleSubmitListing}>
      <div className="flex flex-col items-center justify-center md:grid md:grid-cols-12 gap-6 ">
        {/* listing images  */}
        <div className="md:col-span-6 w-full border border-gray-200 rounded-lg h-full">
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            isFileSizeError={isFileSizeError}
            listingImages={listingImages}
            setListingImages={setListingImages}
            setIsFileSizeError={setIsFileSizeError}
            setRemoveImages={setRemoveImages}
          />
        </div>

        {/* other listing details  */}
        <div className="space-y-6 md:col-span-6 w-full p-4 border border-gray-200 rounded-lg">
          <InputFieldWithIcon
            type="text"
            name="title"
            id="title"
            onChange={handleChanges}
            placeholder="e.g. 3 bedroom apartment"
            icon={<BuildingOfficeIcon className="h-4 w-4 text-gray-500" />}
            value={listingDetails.title}
            label={<IsRequiredLabel label="Title" />}
            isRequired={true}
          />
          {/* description  */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                name="description"
                id="description"
                className="block w-full rounded-md border-0 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-700 sm:text-sm sm:leading-6"
                placeholder="e.g. This is a beautiful 3 bedroom apartment in the heart of New York City."
                value={listingDetails.description}
                onChange={handleChanges}
              />
            </div>
          </div>
          {/* location  */}
          <InputFieldWithIcon
            type="text"
            name="location"
            id="location"
            onChange={handleChanges}
            placeholder="e.g. New York, NY"
            icon={<MapPinIcon className="h-4 w-4 text-gray-500" />}
            value={listingDetails.location}
            label={<IsRequiredLabel label="Location" />}
            isRequired={true}
          />
          {/* Bathrooms and bedrooms */}
          <div className="grid grid-cols-12 gap-2 w-full">
            <div className="col-span-6">
              <InputFieldWithIcon
                type="number"
                name="bedrooms"
                id="bedrooms"
                onChange={handleChanges}
                placeholder="e.g. 3"
                icon={<IconBed className="h-4 w-4 text-gray-500" />}
                value={listingDetails.bedrooms}
                label="Bedrooms"
              />
            </div>
            <div className="col-span-6">
              <InputFieldWithIcon
                type="number"
                name="bathrooms"
                id="bathrooms"
                onChange={handleChanges}
                placeholder="e.g. 4"
                icon={<IconBath className="h-4 w-4 text-gray-500" />}
                value={listingDetails.bathrooms}
                label="Bathrooms"
              />
            </div>
          </div>
          {/* Area and price */}
          <div className="grid grid-cols-12 gap-2 w-full">
            <div className="col-span-6">
              <InputFieldWithIcon
                type="number"
                name="area"
                id="area"
                onChange={handleChanges}
                placeholder="e.g. 4,500 sqft"
                icon={<IconDimensions className="h-4 w-4 text-gray-500" />}
                value={listingDetails.area}
                label="Area"
              />
            </div>
            <div className="col-span-6">
              <InputFieldWithIcon
                type="number"
                name="price"
                id="price"
                onChange={handleChanges}
                placeholder="e.g. 25,000"
                icon={<CurrencyDollarIcon className="h-4 w-4 text-gray-500" />}
                value={listingDetails.price}
                isRequired={true}
                label={<IsRequiredLabel label="Price" />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <div className="w-[150px] mt-6">
          <PrimaryButton
            type="submit"
            fontSize="text-base"
            disabled={isFileSizeError}
          >
            <span>
              {isOnCreateListingPage ? "Create listing" : "Update listing"}
            </span>
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
};

export default CreateUpdateListingForm;
