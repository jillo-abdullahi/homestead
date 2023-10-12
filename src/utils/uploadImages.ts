/**
 * function to upload images to cloudinary
 * @param {File[]} selectedImages - array of images to upload
 * @returns
 */
const uploadImagesToCloudinary = async (selectedImages: File[]) => {
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

export default uploadImagesToCloudinary;
