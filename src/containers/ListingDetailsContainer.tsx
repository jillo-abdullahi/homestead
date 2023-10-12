import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconPhotoX } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import ListingImageGallery from "@/components/imageGallery/ListingImageGallery";
import ListingPrice from "@/components/listingDetails/ListingPrice";
import ListingSpecs from "@/components/listingDetails/ListingSpecs";
import ListingTitle from "@/components/listingDetails/ListingTitle";
import { GET_LISTING } from "@/graph/queries";
import { ListingDetailsEmptyState } from "@/components/listingDetails/ListingDetailsEmptyState";
import { getLoggedInUser } from "@/utils/saveLoggedInUser";
import SecondaryButton from "@/components/buttons/SecondaryButton";

/**
 * listing details component.
 * shows full details of a listing on a dedicated page
 * listing id is passed as a query param
 * @returns
 */

const ListingDetailsContainer: React.FC = () => {
  const [userIsOwner, setUserIsOwner] = useState(false);
  const router = useRouter();
  const { listingId } = router.query;

  const { data, loading, error } = useQuery(GET_LISTING, {
    variables: { listingId },
    skip: !listingId,
  });

  const listing = data?.listing;

  // check if logged in user is the owner of the listing
  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser && loggedInUser.id === listing?.user.id) {
      setUserIsOwner(true);
    }
  }, [listing?.user.id]);

  if (error || loading)
    return <ListingDetailsEmptyState error={error ? true : false} />;

  return (
    <div className="flex flex-col items-center justify-center md:grid md:grid-cols-12 gap-10 mt-10 sm:mt-28 w-full">
      <div className="w-full md:col-span-6 h-full flex flex-col items-start">
        {listing?.images?.length === 0 && (
          <div className="w-full min-h-[20rem] min-h-md flex items-center justify-center bg-gray-200 rounded-lg">
            <IconPhotoX size={32} className="text-gray-400" />
          </div>
        )}

        <div className="w-full">
          {/* image carousel */}
          {listing?.images && listing?.images?.length > 0 && (
            <ListingImageGallery images={listing?.images ?? []} />
          )}

          {userIsOwner && (
            <div className="border border-gray-200 rounded-lg p-4 w-full mt-6">
              {/* Admin zone to edit or delete listing  */}
              <div className="flex flex-col items-start space-y-4 justify-center">
                <div className="text-gray-700 text-sm font-medium">
                  Admin zone
                </div>
                <div className="w-full flex flex-col space-y-6">
                  <SecondaryButton>Edit Listing</SecondaryButton>
                  <button className="text-red-500 hover:bg-red-100 border border-red-600 transition-all duration-150 rounded-lg py-3 text-sm">
                    Delete Listing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-full md:col-span-6 space-y-4 flex flex-col items-start justify-start">
        {/* title and location  */}
        {listing?.title && (
          <ListingTitle
            title={listing?.title ?? ""}
            location={listing?.location ?? ""}
          />
        )}

        {/* Listing owner  */}
        <div className="my-1 text-gray-700">
          Added by{" "}
          <span className="text-violet-700 font-semibold">
            {userIsOwner ? "You" : listing?.user?.username}
          </span>
        </div>

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
      {/* <div className="w-full md:col-span-4">Put admin buttons here</div> */}
    </div>
  );
};

export default ListingDetailsContainer;
