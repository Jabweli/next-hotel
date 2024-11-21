import { defineField, defineType } from "sanity";
import { OkHandIcon } from "@sanity/icons";

export const verificationTokenType = defineType({
  name: "verificationToken",
  title: "Verification Token",
  type: "document",
  icon: OkHandIcon,
  fields: [
    defineField({
      name: "identifier",
      title: "Identifier",
      type: "string",
    }),
    defineField({
      name: "token",
      title: "Token",
      type: "string",
    }),
    defineField({
      name: "expires",
      title: "Expires",
      type: "datetime",
    }),
  ],
});
