import { defineField, defineType } from "sanity";
import { CreditCardIcon } from "@sanity/icons";

export const accountType = defineType({
  name: "account",
  title: "Account",
  type: "document",
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: "providerType",
      type: "string",
    }),
    defineField({
      name: "providerId",
      type: "string",
    }),
    defineField({
      name: "providerAccountId",
      type: "string",
    }),
    defineField({
      name: "refreshToken",
      type: "string",
    }),
    defineField({
      name: "accessToken",
      type: "string",
    }),
    defineField({
      name: "accessTokenExpires",
      type: "number",
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: { type: "user" },
    }),
  ],
});
