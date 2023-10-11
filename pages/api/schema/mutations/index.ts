import { User } from "@prisma/client";
import builder from "../builder";
import {
  createUser,
  resetPassword,
  updatePassword,
  confirmUser,
  loginUser,
  resendUserConfirmation,
} from "../../resolvers/user/mutations";
import {
  createListing,
  updateListing,
} from "../../resolvers/listings/mutations";

builder.mutationType({
  // create a new user
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

    // create a listing
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

    // update listing
    updateListing: t.prismaField({
      type: "Listing",
      description: "Update a listing",
      args: {
        id: t.arg.string({ required: true }),
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

        return await updateListing({ ...args }, user);
      },
    }),

    // login user
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

    // confirm user email address
    confirmUser: t.prismaField({
      type: "User",
      description: "Confirm user email",
      resolve: async (query, root, args, ctx, info) => {
        const { user } = ctx as { user: User };
        if (!user) {
          throw new Error("User not found");
        }

        return await confirmUser(user);
      },
    }),

    // send email to reset user password
    resetPassword: t.prismaField({
      type: "User",
      description: "Reset user password - send reset password email",
      args: {
        email: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { email } = args;
        return await resetPassword({ email });
      },
    }),

    // update user password from reset token
    updatePassword: t.prismaField({
      type: "User",
      description: "Update user password",
      args: {
        password: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { user } = ctx as { user: User };
        if (!user) {
          throw new Error("User not found");
        }

        return await updatePassword({ ...args }, user);
      },
    }),

    // resend user confirmation email
    resendUserConfirmation: t.prismaField({
      type: "User",
      description: "Resend confirmation email",
      args: {
        email: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { email } = args;

        return await resendUserConfirmation({ email });
      },
    }),
  }),
});
