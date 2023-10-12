import { memo, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
/**
 * component for an individual selected image
 * @param {File[]} selectedImages - array of selected images
 * @param {function} removeImage - function to remove an image
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setFileSizeErrors - function to set file size errors
 * @returns
 */

interface SelectedImageProps {
  selectedImages: File[];
  removeImage: (index: number) => void;
  setIsFileSizeError: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedImage: React.FC<SelectedImageProps> = ({
  selectedImages,
  removeImage,
  setIsFileSizeError,
}) => {
  const maxFileSize = 1 * 1024 * 1024; // 1MB

  // check file size
  useEffect(() => {
    const fileSizeError = selectedImages.find((image) => {
      return image.size > maxFileSize;
    });
    if (fileSizeError) {
      setIsFileSizeError(true);
    } else {
      setIsFileSizeError(false);
    }
  }, [selectedImages]);

  return (
    <div className="space-y-2">
      {/* show empty state if no images are selected */}
      {selectedImages.length === 0 && (
        <>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                className="rounded-lg w-full h-[65px] border border-gray-100 bg-gray-100"
                key={index}
              ></div>
            ))}
        </>
      )}

      {/* show selected images */}
      {selectedImages.length > 0 &&
        selectedImages.map((image, index) => {
          // check file size
          const fileSizeExceeded = image.size > maxFileSize;

          return (
            <div
              className={`w-full p-2 rounded-lg grid grid-cols-12 border border-gray-200 h-[66px] ${
                fileSizeExceeded
                  ? "bg-red-100 border-red-400"
                  : "bg-transparent"
              }`}
              key={index}
            >
              <div className="col-span-8 flex items-center space-x-2">
                <div
                  className="rounded-md overflow-hidden w-1/4 h-full"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                <div className="space-y-1 overflow-hidden w-3/4">
                  <div className="text-gray-700 line-clamp-1">{image.name}</div>
                  <div className="text-gray-400 text-xs line-clamp-1">
                    {(image.size / maxFileSize).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <div className="col-span-4 flex items-center justify-end">
                <button
                  type="button"
                  className="font-medium"
                  onClick={() => removeImage(index)}
                >
                  <TrashIcon className="h-5 w-5 text-gray-800 hover:text-red-600 " />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default memo(SelectedImage);
