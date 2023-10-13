import { TrashIcon } from "@heroicons/react/24/outline";
/**
 * component to preview an image
 * image can either be existing image or a newly uploaded image
 * @param {string} image - image url
 *
 */
interface ImagePreviewProps {
  image: string | File;
  index: number;
  removeImage?: (index: number) => void;
  removeSavedImage?: (image: string) => void;
  fileSizeExceeded?: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  fileSizeExceeded,
  index,
  removeImage,
  removeSavedImage,
}) => {
  const maxFileSize = 1 * 1024 * 1024; // 1MB
  const imageIsFile = image instanceof File;
  const imageSrc = imageIsFile ? URL.createObjectURL(image) : image;

  // function to remove image
  // either removes image from selected images array or deletes image from server
  const handleRemoveImage = () => {
    if (imageIsFile) {
      removeImage && removeImage(index);
    } else {
      // delete image from server
      // run mutation to update listing
      removeSavedImage && removeSavedImage(image);
    }
  };
  //
  return (
    <div
      className={`w-full p-2 rounded-lg grid grid-cols-12 border border-gray-200 h-[66px] ${
        fileSizeExceeded ? "bg-red-100 border-red-400" : "bg-transparent"
      }`}
      key={index}
    >
      <div className="col-span-8 flex items-center space-x-2">
        <div
          className="rounded-md overflow-hidden w-1/4 h-full"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {imageIsFile && (
          <div className="space-y-1 overflow-hidden w-3/4">
            <div className="text-gray-700 line-clamp-1">{image.name}</div>
            <div className="text-gray-400 text-xs line-clamp-1">
              {(image.size / maxFileSize).toFixed(2)} MB
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 flex items-center justify-end">
        <button
          type="button"
          className="font-medium"
          onClick={handleRemoveImage}
        >
          <TrashIcon className="h-5 w-5 text-gray-800 hover:text-red-600 " />
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
