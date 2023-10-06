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

// user type
builder.prismaObject("User", {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    username: t.exposeString("username", { nullable: true }),
    password: t.exposeString("password", { nullable: true }),
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

builder.mutationType({
  fields: (t) => ({
    // Add mutation that returns a simple boolean
    post: t.boolean({
      args: {
        message: t.arg.string(),
      },
      resolve: async (root, args) => {
        // Do something with the message
        return true;
      },
    }),
  }),
});

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.user.create({
        data: {
          email: args.email,
          username: args.username,
          password: args.password,
        },
      }),
  })
);

export const schema = builder.toSchema();
