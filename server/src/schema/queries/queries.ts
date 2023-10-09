import { PrismaClient } from "@prisma/client";
import builder from "../builder/builder.js";

const prisma = new PrismaClient({});

//TODO: add total records count for listings
builder.queryType({
  // query all listings (paginated)
  fields: (t) => ({
    listings: t.prismaField({
      type: ["Listing"],
      description: "Get all listings",
      args: {
        skip: t.arg.int(),
        take: t.arg.int(),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { skip, take } = args;
        return await prisma.listing.findMany({
          skip: skip || 0,
          take: take || 10,
        });
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
        const { id } = args;

        const listing = await prisma.listing.findUnique({
          where: {
            id,
          },
        });

        if (!listing) {
          throw new Error(`Listing with id ${id} not found`);
        }
        return listing;
      },
    }),
  }),
});
