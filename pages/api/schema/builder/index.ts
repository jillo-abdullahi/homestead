// initialize the schema builder

import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import prisma from "../../utils/prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { DateTimeResolver } from "graphql-scalars";

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
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
    onUnusedQuery:
      process.env.NODE_ENV === "production" ? null : "warn",
  },
});

builder.addScalarType("Date", DateTimeResolver, {});

export default builder;
