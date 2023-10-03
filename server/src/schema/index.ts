import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from "@pothos/plugin-prisma/generated";

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: true,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});

// generate Listing and User types from prisma schema
builder.prismaObject("Listing", {
  name: "Listing",
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description", { nullable: true }),
    price: t.exposeFloat("price", { nullable: true }),
    location: t.exposeString("location", { nullable: true }),
    bedrooms: t.exposeInt("bedrooms", { nullable: true }),
    bathrooms: t.exposeInt("bathrooms", { nullable: true }),
    area: t.exposeInt("area", { nullable: true }),
    images: t.exposeStringList("images"),
  }),
});

// all listings query
builder.queryType({
  fields: (t) => ({
    listings: t.prismaField({
      type: ["Listing"],
      resolve: async (query, root, args, ctx, info) =>
        await prisma.listing.findMany({
          ...query,
          ...args,
        }),
    }),
  }),
});

// single listing quer

export const schema = builder.toSchema();
