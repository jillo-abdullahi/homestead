import { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import SelectedImage from "@/components/imageUploader/SelectedImage";
/**
 * component to handle image uploads when creating a listing
 * @returns
 */

const ImageUploader: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // handle file upload
  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setSelectedImages((prevState) => [...prevState, ...files]);
  };

  // function to reset file upload input after each upload
  // this is to allow user to upload the same image again if necessary
  // and also to allow the user re-upload an image after removing it.
  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.value = "";
    }
  };

  // remove a single image before uploading to api
  const removeImage = (index: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, idx) => idx !== index)
    );
  };
  return (
    <div className="space-y-3 p-4">
      <div className="block text-sm font-medium leading-6 ">
        <div className="text-gray-900">Images</div>
        <div className="text-violet-700 flex items-center justify-start text-left text-xs">
          Images must be at most 1024x1024px. Use PNG or JPG format.
        </div>
      </div>

      {/* image uploader input  */}
      <div>
        <div className="w-full h-48 rounded-lg border border-violet-700 border-dashed bg-gray-100 flex items-center justify-center">
          <input
            type="file"
            multiple
            id="files"
            accept="image/*"
            className="hidden"
            onChange={handleFilesUpload}
            ref={fileInputRef}
          />
          <label
            htmlFor="files"
            className="p-5 flex flex-col justify-center items-center space-y-2 cursor-pointer w-full h-full"
            onClick={handleLabelClick}
          >
            <PhotoIcon className="h-8 w-8 text-purple-700" />
            <p className="text-purple-700 font-medium">+ Upload Images</p>
          </label>
        </div>
      </div>
      {/* images preview  */}
      <div className="max-h-[300px] overflow-scroll no-scrollbar">
        <SelectedImage
          selectedImages={selectedImages}
          removeImage={removeImage}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
