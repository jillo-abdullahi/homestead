import { useRouter } from "next/router";
import { IconPhoto, IconPhotoX } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import ListingImageGallery from "@/components/imageGallery/ListingImageGallery";
import ListingPrice from "@/components/listingDetails/ListingPrice";
import ListingSpecs from "@/components/listingDetails/ListingSpecs";
import ListingTitle from "@/components/listingDetails/ListingTitle";
import { GET_LISTING } from "@/graph/queries";
import { ListingDetailsEmptyState } from "@/components/listingDetails/ListingDetailsEmptyState";

/**
 * listing details component.
 * shows full details of a listing on a dedicated page
 * listing id is passed as a query param
 * @returns
 */

const ListingDetailsContainer: React.FC = () => {
  const router = useRouter();
  const { listingId } = router.query;

  const { data, loading, error } = useQuery(GET_LISTING, {
    variables: { listingId },
    skip: !listingId,
  });

  const listing = data?.listing;


  if (error || loading)
    return <ListingDetailsEmptyState error={error ? true : false} />;

  return (
    <div className="flex flex-col items-center justify-center md:grid md:grid-cols-12 gap-6 mt-10 sm:mt-28">
      {
        <div className="w-full md:col-span-6">
          {/* image carousel */}

          {listing?.images?.length === 0 && (
            <div className="w-full min-h-[20rem] min-h-md flex items-center justify-center bg-gray-200 rounded-lg">
              <IconPhotoX size={32} className="text-gray-400" />
            </div>
          )}

          {listing?.images && listing?.images?.length > 0 && (
            <ListingImageGallery images={listing?.images ?? []} />
          )}
        </div>
      }
      <div className="w-full h-full md:col-span-6 space-y-4 flex flex-col items-start justify-center">
        {/* title and location  */}
        {listing?.title && (
          <ListingTitle
            title={listing?.title ?? ""}
            location={listing?.location ?? ""}
          />
        )}

        {/* listing description  */}
        {listing?.description && (
          <div className="text-gray-700">{listing?.description}</div>
        )}

        {/* listing specs  */}

        <ListingSpecs
          bedrooms={listing?.bedrooms ?? "-"}
          bathrooms={listing?.bathrooms ?? "-"}
          area={listing?.area ?? "-"}
        />

        {/* date added  */}
        {listing?.createdAt && (
          <div className="text-violet-500 text-sm">
            Listed {moment(listing?.createdAt).fromNow()}
          </div>
        )}

        {/* price  */}
        <ListingPrice price={listing?.price ?? "-"} />
      </div>
    </div>
  );
};

export default ListingDetailsContainer;
