import { memo, useEffect } from "react";
import ImagePreview from "@/components/imageUploader/ImagePreview";
/**
 * component for an individual selected image
 * @param {File[]} selectedImages - array of selected images
 * @param {function} removeImage - function to remove an image
 * @param {boolean} isFileSizeError - boolean to indicate if image size is too large
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setFileSizeErrors - function to set file size errors
 * @param {string[]} listingImages - array of listing images if on update listing page
 * @param {function} removeSavedImage - function to remove saved image
 * @returns
 */

interface SelectedImageProps {
  selectedImages: File[];
  removeImage: (index: number) => void;
  isFileSizeError?: boolean;
  setIsFileSizeError: React.Dispatch<React.SetStateAction<boolean>>;
  listingImages?: string[];
  removeSavedImage?: (image: string) => void;
}

const SelectedImage: React.FC<SelectedImageProps> = ({
  selectedImages,
  removeImage,
  setIsFileSizeError,
  listingImages,
  isFileSizeError,
  removeSavedImage,
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
      {/* show selected images */}
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

        <div>
          {selectedImages.length > 0 ? (
            <div className="space-y-2">
              {selectedImages.map((image, index) => {
                // check file size
                const fileSizeExceeded = image.size > maxFileSize;

                return (
                  <ImagePreview
                    fileSizeExceeded={fileSizeExceeded}
                    image={image}
                    removeImage={removeImage}
                    index={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="rounded-lg w-full h-[65px] border border-gray-100 bg-gray-100"
                    key={index}
                  ></div>
                ))}
            </div>
          )}
        </div>
      </>

      {/* show listing images if on update listing page */}
      {listingImages && listingImages.length > 0 && (
        <div>
          <div className="text-sm text-gray-700 py-2">Saved images</div>
          <div className="space-y-2">
            {listingImages.map((image, index) => {
              return (
                <ImagePreview
                  image={image}
                  removeSavedImage={removeSavedImage}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SelectedImage);
