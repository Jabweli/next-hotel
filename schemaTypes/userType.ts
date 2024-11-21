import { defineType, defineField } from "sanity";
import { AddUserIcon } from "@sanity/icons";

export const userType = defineType({
  name: "user",
  title: "Users",
  type: "document",
  icon: AddUserIcon,
  fields: [
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "Check if user is an administrator",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the user",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "emailVerified",
      type: "datetime",
      hidden: true,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "about",
      title: "About",
      type: "text",
      description: "A brief description about the user",
    }),
  ],
});
