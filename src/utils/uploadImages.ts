/**
 * function to upload images to cloudinary
 * @param {File[]} selectedImages - array of images to upload
 * @param {string} signature - signature (from server) for secure upload
 * @param {string} timestamp - timestamp(from server) for secure upload
 * @returns
 */
const uploadImagesToCloudinary = async (
  selectedImages: File[],
  signature: string,
  timestamp: string
) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME!;
  const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!;
  const UPLOAD_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER!;

  const uploadPromises = selectedImages.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", UPLOAD_FOLDER);
    // note that we're not exposing the SECRET_KEY here
    // using the API_KEY and timestamp, cloudinary will verify the signature
    formData.append("api_key", API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

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
  console.log({ results });
  return results;
};

export default uploadImagesToCloudinary;
