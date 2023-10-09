import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";
import { PrismaClient, User } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from "graphql-scalars";
import dotenv from "dotenv";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { createUser, confirmUser, loginUser } from "./resolvers/user/index.js";
import { createListing } from "./resolvers/listings/index.js";

import { signToken } from "./utils/jwt.js";

import { getUserFromToken } from "./utils/getUserFromToken.js";

dotenv.config();
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
  description: "A listing",
  fields: (t) => ({
    id: t.exposeString("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description", { nullable: true }),
    price: t.exposeFloat("price", { nullable: false }),
    location: t.exposeString("location", { nullable: false }),
    bedrooms: t.exposeInt("bedrooms", { nullable: true }),
    bathrooms: t.exposeInt("bathrooms", { nullable: true }),
    area: t.exposeInt("area", { nullable: true }),
    images: t.exposeStringList("images"),
    user: t.relation("user", { nullable: true }),
    createdAt: t.expose("createdAt", { nullable: false, type: "Date" }),
  }),
});

// user type
builder.prismaObject("User", {
  name: "User",
  description: "A user",
  fields: (t) => ({
    id: t.exposeString("id"),
    username: t.exposeString("username"),
    email: t.exposeString("email"),
    createdAt: t.expose("createdAt", { nullable: false, type: "Date" }),
    confirmed: t.exposeBoolean("confirmed", { nullable: false }),
    token: t.string({
      resolve: (parent) => {
        const { email, id, confirmed } = parent;
        return signToken({
          email,
          id,
          confirmed,
        });
      },
    }),
  }),
});

// all listings query
//TODO: add total records count for listings
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

    listing: t.prismaField({
      type: "Listing",
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

// mutations
builder.mutationType({
  fields: (t) => ({
    createUser: t.prismaField({
      type: "User",
      description: "Create a new user",
      args: {
        email: t.arg.string({ required: true }),
        username: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { email, username, password } = args;
        return await createUser({ email, username, password });
      },
    }),
    createListing: t.prismaField({
      type: "Listing",
      description: "Create a new listing",
      args: {
        title: t.arg.string({ required: true }),
        description: t.arg.string({ required: false }),
        price: t.arg.float({ required: true }),
        location: t.arg.string({ required: true }),
        bedrooms: t.arg.int({ required: false }),
        bathrooms: t.arg.int({ required: false }),
        area: t.arg.int({ required: false }),
        images: t.arg.stringList({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { user } = ctx as { user: User };
        if (!user) {
          throw new Error("User is not authenticated");
        }

        return await createListing({ ...args }, user);
      },
    }),

    loginUser: t.prismaField({
      type: "User",
      description: "Login user",
      args: {
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { email, password } = args;

        return await loginUser({ email, password });
      },
    }),

    confirmUser: t.prismaField({
      type: "User",
      description: "Confirm user",

      resolve: async (query, root, args, ctx, info) => {
        const { user } = ctx as { user: User };
        if (!user) {
          throw new Error("User not found");
        }

        return await confirmUser(user);
      },
    }),
  }),
});

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

  context: async ({ req }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || "";

    // get user from token
    const user = await getUserFromToken(token);

    // Add the user to the context
    return { user };
  },
});

console.log(`🚀  Server ready at: ${url}`);
