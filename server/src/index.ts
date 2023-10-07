import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";
import { PrismaClient, User } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from "graphql-scalars";
import { createUser } from "./resolvers/createUser.js";
import { decodeToken, verifyToken } from "./utils/jwt.js";
import dotenv from "dotenv";
dotenv.config();
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { signToken } from "./utils/jwt.js";
import { JwtPayload } from "jsonwebtoken";

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
    id: t.exposeID("id"),
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
    id: t.exposeID("id"),
    username: t.exposeString("username"),
    email: t.exposeString("email"),
    createdAt: t.expose("createdAt", { nullable: false, type: "Date" }),
    token: t.string({
      resolve: (parent) => {
        return signToken({ email: parent.email, id: parent.id });
      },
    }),
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

builder.mutationType({});

builder.mutationField("createUser", (t) =>
  t.prismaField({
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
  })
);

builder.mutationField("createListing", (t) =>
  t.prismaField({
    type: "Listing",
    description: "Create a new listing",
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string(),
      price: t.arg.float({ required: true }),
      location: t.arg.string({ required: true }),
      bedrooms: t.arg.int(),
      bathrooms: t.arg.int(),
      area: t.arg.int(),
      images: t.arg.stringList({ required: true }),
    },
    resolve: async (query, root, args, ctx: any, info) => {
      console.log(ctx)

      // TODO: Put this in a resolver function
      if (!ctx?.user) {
        throw new Error("Unauthorized");
      }
      const {
        title,
        description,
        price,
        location,
        bedrooms,
        bathrooms,
        area,
        images,
      } = args;
      return await prisma.listing.create({
        data: {
          title,
          description,
          price,
          location,
          bedrooms,
          bathrooms,
          area,
          images,
          user: {
            connect: { id: ctx?.user?.id },
          },
        },
      });
    },
  })
);

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

    // TODO: Put this in a util function
    if (token) {
      verifyToken(token);
    }

    // Try to retrieve a user with the token
    const user = token ? decodeToken(token) : null;

    if (user) {
      const { id } = user as JwtPayload;
      const dbUser = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return { user: dbUser };
      // will add check for non-existent user at resolver level
      // since we don't want to protect all queries/mutations
    }

    // Add the user to the context
    return { user };
  },
});

console.log(`🚀  Server ready at: ${url}`);
