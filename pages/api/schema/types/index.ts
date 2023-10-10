import builder from "../builder";
import { signToken } from "../../utils/jwt";

// Listing type
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

// User type
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
