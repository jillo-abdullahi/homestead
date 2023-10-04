import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
/**
 * component for an individual selected image
 * @param {File[]} selectedImages - array of selected images
 * @param {function} removeImage - function to remove an image
 * @returns
 */

interface SelectedImageProps {
  selectedImages: File[];
  removeImage: (index: number) => void;
}

const SelectedImage: React.FC<SelectedImageProps> = ({
  selectedImages,
  removeImage,
}) => {
  return (
    <div className="space-y-2">
      {/* show empty state if no images are selected */}
      {selectedImages.length === 0 && (
        <>
          {Array(4).fill(0).map((_, index) => (
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
          return (
            <div
              className="w-full p-2 rounded-lg grid grid-cols-12 border border-gray-200 h-[66px]"
              key={index}
            >
              <div className="col-span-8 flex items-center space-x-2">
                <div className="rounded-md w-[50px] h-[50px] overflow-hidden">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    width={50}
                    height={50}
                    className="rounded-md overflow-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <div className="text-gray-700">{image.name}</div>
                  <div className="text-gray-400 text-xs">
                    {image.size / 1000} KB
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

export default SelectedImage;
