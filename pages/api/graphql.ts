import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "./schema";
import { getUserFromToken } from "./utils/jwt";

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const token = req.headers.authorization || "";
    return { req, res, user: await getUserFromToken(token) };
  },
});
