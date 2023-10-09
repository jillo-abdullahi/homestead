import builder from "../builder/builder.js";
import {
  getListings,
  getListingById,
} from "../../resolvers/listings/queries.js";

//TODO: add total records count for listings
builder.queryType({
  // query all listings (paginated)
  fields: (t) => ({
    listings: t.prismaField({
      type: ["Listing"],
      description: "Get all listings",
      args: {
        skip: t.arg.int({ required: false }),
        take: t.arg.int({ required: false }),
      },
      resolve: async (query, root, args, ctx, info) => {
        return await getListings({ ...args });
      },
    }),

    // query a listing by id
    listing: t.prismaField({
      type: "Listing",
      description: "Get a listing by id",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        return await getListingById({ ...args });
      },
    }),
  }),
});
