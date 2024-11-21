import { defineField, defineType } from "sanity";
import { LemonIcon } from "@sanity/icons";

export const amenityType = defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  icon: LemonIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required().error("Enter amenity name"),
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Amenity icon",
    }),
  ],
});
