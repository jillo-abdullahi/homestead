import { useState } from "react";
import {
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { IconBed, IconBath, IconDimensions } from "@tabler/icons-react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputFieldWithIcon from "@/components/InputFieldWithIcon";
import Navbar from "@/components/navbar/Navbar";
import IsRequiredLabel from "@/components/IsRequiredLabel";
import ImageUploader from "@/components/imageUploader/ImageUploader";
/**
 * form component to create a new listing.
 * @returns
 */

const CreateListingForm: React.FC = () => {
  const [newListingDetails, setNewListingDetails] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: [],
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: "",
  });

  // send to server
  const handleSubmitListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newListingDetails);
  };

  // handle input changes
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewListingDetails((prevState) => ({ ...prevState, [name]: value }));
  };
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

          <form className="mt-6" onSubmit={handleSubmitListing}>
            <div className="flex flex-col items-center justify-center md:grid md:grid-cols-12 gap-6 ">
              {/* listing images  */}
              <div className="md:col-span-6 w-full border border-gray-200 rounded-lg h-full">
                <ImageUploader />
              </div>

              {/* other listing details  */}
              <div className="space-y-6 md:col-span-6 w-full p-4 border border-gray-200 rounded-lg">
                <InputFieldWithIcon
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChanges}
                  placeholder="e.g. 3 bedroom apartment"
                  icon={
                    <BuildingOfficeIcon className="h-4 w-4 text-gray-500" />
                  }
                  value={newListingDetails.title}
                  label={<IsRequiredLabel label="Title" />}
                  isRequired={true}
                  error={formErrors.title}
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
                  value={newListingDetails.location}
                  label={<IsRequiredLabel label="Location" />}
                  isRequired={true}
                  error={formErrors.title}
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
                      value={newListingDetails.bedrooms}
                      label="Bedrooms"
                      error={formErrors.bedrooms}
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
                      value={newListingDetails.bathrooms}
                      label="Bathrooms"
                      error={formErrors.bathrooms}
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
                      icon={
                        <IconDimensions className="h-4 w-4 text-gray-500" />
                      }
                      value={newListingDetails.area}
                      label="Area"
                      error={formErrors.area}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputFieldWithIcon
                      type="number"
                      name="price"
                      id="price"
                      onChange={handleChanges}
                      placeholder="e.g. 25,000"
                      icon={
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
                      }
                      value={newListingDetails.price}
                      isRequired={true}
                      label={<IsRequiredLabel label="Price" />}
                      error={formErrors.price}
                    />
                  </div>
                </div>
              </div>

              {/* title   */}
            </div>
            <div className="w-full flex items-center justify-end">
              <div className="w-[150px] mt-6">
                <PrimaryButton type="submit" fontSize="text-base">
                  <span>Create listing</span>
                </PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListingForm;
