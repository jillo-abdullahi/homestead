import { useRef, useCallback } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import SelectedImage from "@/components/imageUploader/SelectedImage";
/**
 * component to handle image uploads when creating a listing
 * @param {Array<File>} selectedImages - array of selected images
 * @param {React.Dispatch<React.SetStateAction<File[]>>} setSelectedImages - function to set selected images
 * @returns
 */

interface ImageUploaderProps {
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  isFileSizeError: boolean;
  setIsFileSizeError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImages,
  setSelectedImages,
  isFileSizeError,
  setIsFileSizeError,
}) => {
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

  // remove a single image from selection
  const removeImage = useCallback((index: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, idx) => idx !== index)
    );
  }, []);

  return (
    <div className="space-y-3 p-4">
      <div className="block text-sm font-medium leading-6 ">
        <div className="text-gray-900">Images</div>
        <div className="text-violet-700 flex items-center justify-start text-left text-xs">
          Image size must not exceed 1MB. Use PNG or JPG format.
        </div>
      </div>

      {/* image uploader input  */}
      <div>
        <div className="w-full h-48 rounded-lg border border-violet-700 border-dashed bg-gray-100 flex items-center justify-center">
          <input
            type="file"
            multiple
            id="files"
            accept="image/jpeg, image/png"
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
      <>
        <div className="text-sm text-gray-700 pt-2">
          {selectedImages.length}{" "}
          {selectedImages.length === 1 ? "image" : "images"} added.
        </div>
        {isFileSizeError && (
          <div className="text-xs border border-red-500 bg-red-100 text-red-500 rounded-md p-1">
            Image(s) highlighted in red are too large.
          </div>
        )}
        <div className="max-h-[300px] overflow-scroll no-scrollbar">
          <SelectedImage
            selectedImages={selectedImages}
            removeImage={removeImage}
            setIsFileSizeError={setIsFileSizeError}
          />
        </div>
      </>
    </div>
  );
};

export default ImageUploader;
