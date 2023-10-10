import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { getUserFromToken } from "./utils/index.js";
import { schema } from "./schema/index.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const server = new ApolloServer({
  schema,
});

// passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: +process.env.PORT! || 4000 },

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
