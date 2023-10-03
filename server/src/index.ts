import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from "graphql-scalars";
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from "@pothos/plugin-prisma/generated";

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
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

builder.addScalarType("Date", DateTimeResolver, {});

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

// user type
builder.prismaObject("User", {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username"),
    email: t.exposeString("email"),
    createdAt: t.expose("createdAt", { nullable: false, type: "Date" }),
    listings: t.relation("listings", {}),
  }),
});

// all listings query
//TODO: add total records count
builder.queryType({
  fields: (t) => ({
    listings: t.prismaField({
      type: ["Listing"],
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
  }),
});

// create listing mutation
// builder.mutationType({
//   fields: (t) => ({
//     createListing: t.prismaField({
//       type: "Listing",
//       args: {
//         title: t.arg.string(),
//         description: t.arg.string(),
//         price: t.arg.float(),
//         location: t.arg.string(),
//         bedrooms: t.arg.int(),
//         bathrooms: t.arg.int(),
//         area: t.arg.int(),
//         images: t.arg.stringList(),
//       },
//       resolve: async (query, root, args, ctx, info) => {
//         return await prisma.listing.create({
//           ...query,
//           data: args,
//         });
//       },
//     }),
//   }),
// });

export const schema = builder.toSchema();

const server = new ApolloServer({
  schema,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
