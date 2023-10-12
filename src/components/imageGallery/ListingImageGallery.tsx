import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import NavButton from "@/components/imageGallery/NavButton";
import FullScreenButton from "@/components/imageGallery/FullscreenButton";

/**
 * image gallery component for a property listing
 * @param {Array<{original: string, thumbnail: string}>} images - array of image objects
 * @returns
 */

interface ListingImageGalleryProps {
  images: string[];
}

const ListingImageGallery: React.FC<ListingImageGalleryProps> = ({
  images,
}) => {
  const imagesWithThumbnails = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));
  return (
    <ImageGallery
      items={imagesWithThumbnails}
      showPlayButton={false}
      renderLeftNav={(onClick, disabled) => (
        <NavButton onClick={onClick} disabled={disabled} />
      )}
      renderRightNav={(onClick, disabled) => (
        <NavButton onClick={onClick} disabled={disabled} isLeftButton={false} />
      )}
      renderFullscreenButton={(onClick, isFullscreen) => (
        <FullScreenButton onClick={onClick} isFullscreen={isFullscreen} />
      )}
    />
  );
};

export default ListingImageGallery;
