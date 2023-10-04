import { useRouter } from "next/router";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Navbar from "@/components/Navbar";
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

const ListingDetails: React.FC = () => {
  const router = useRouter();
  const { listingId } = router.query;

  // TODO: fetch listing details from server

  const sampleListing = listings[0];
  const { title, location, price, id, bedrooms, bathrooms, area, images } =
    sampleListing;

  return (
    <div className="container">
      <Navbar isLoggedin={false} />

      <div className="flex flex-col items-center justify-center md:grid md:grid-cols-12 gap-6 mt-10">
        <div className="w-full md:col-span-8">
          {/* image carousel */}
          {listingId && <ListingImageGallery images={images} />}
        </div>
        <div className="w-full h-full md:col-span-4 space-y-4 flex flex-col items-start justify-center">
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

export default ListingDetails;
