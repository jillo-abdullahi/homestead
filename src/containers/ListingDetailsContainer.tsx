import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ListingImageGallery from "@/components/imageGallery/ListingImageGallery";
import { listings } from "@/utils/dummyListings";
import ListingPrice from "@/components/listingDetails/ListingPrice";
import ListingSpecs from "@/components/listingDetails/ListingSpecs";
import ListingTitle from "@/components/listingDetails/ListingTitle";

/**
 * listing details component.
 * shows full details of a listing on a dedicated page
 * @returns
 */

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area?: number;
  images: Array<{ original: string; thumbnail: string }>;
}

const ListingDetailsContainer: React.FC = () => {
  const router = useRouter();
  const { listingId } = router.query;

  const [currentListing, setCurrentListing] = useState<Listing | null>(null);

  useEffect(() => {
    // TODO: fetch listing details from server
    // TODO: add empty, loading, and error states
    if (listingId) {
      const currentListing = listings.find(
        (listing) => listing.id === listingId
      );
      if (currentListing) {
        setCurrentListing(currentListing);
      }
    }
  }, [listingId]);

  // TODO: fetch listing details from server
  const { title, location, price, id, bedrooms, bathrooms, area, images } =
    currentListing ?? {};

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:grid md:grid-cols-12 gap-6 mt-10">
        <div className="w-full md:col-span-6">
          {/* image carousel */}
          {currentListing && (
            <ListingImageGallery images={currentListing.images} />
          )}
        </div>
        <div className="w-full h-full md:col-span-6 space-y-4 flex flex-col items-start justify-center">
          {/* title and location  */}
          <ListingTitle title={title ?? ""} location={location ?? ""} />

          {/* listing description  */}
          <div className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            voluptatem, voluptatum quibusdam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quia voluptatem, voluptatum quibusdam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          </div>

          {/* listing specs  */}
          <ListingSpecs
            bedrooms={bedrooms ?? 0}
            bathrooms={bathrooms ?? 0}
            area={area ?? 0}
          />

          {/* date added  */}
          <div className="text-violet-500 text-sm">Added 2 weeks ago.</div>

          {/* price  */}
          {<ListingPrice price={price ?? 0} />}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsContainer;
