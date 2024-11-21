import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { JoystickIcon } from "@sanity/icons";

const roomTypes = [
  { title: "Basic", value: "basic" },
  { title: "Luxury", value: "luxury" },
  { title: "Suite", value: "suite" },
];

export const hotelRoomType = defineType({
  name: "hotelRoom",
  title: "Hotel Room",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) =>
        rule.required().max(50).error("Maximum 50 Characters"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) =>
        rule.required().min(100).error("Minimum 100 Characters"),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) =>
        rule.required().min(100).error("Minimum 100 Characters"),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        {
          name: "image",
          type: "image",
          title: "Image",
          description: "Upload cover image",
        },
        {
          name: "altText",
          type: "string",
          title: "Alt Text",
          description: "Alternative text for screen readers.",
        },
        {
          name: "width",
          type: "number",
          title: "Width",
          description: "Original width dimension of the image",
        },
        {
          name: "height",
          type: "number",
          title: "height",
          description: "Original height dimension of the image",
        },
      ],
      validation: (rule) => rule.required().error("Cover Image is required"),
    }),

    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "Image" },
            {
              name: "altText",
              type: "string",
              title: "Alt Text",
              description: "Alternative text for screen readers.",
            },
            {
              name: "width",
              type: "number",
              title: "Width",
            },
            {
              name: "height",
              type: "number",
              title: "height",
            },
          ],
        },
      ],
      validation: (rule) =>
        rule.required().min(3).error("Minimum of 3 images required"),
    }),

    defineField({
      name: "type",
      title: "Room Type",
      type: "string",
      options: {
        list: roomTypes,
      },
      validation: (rule) => rule.required(),
      initialValue: "basic",
    }),
    defineField({
      name: "numberOfAdults",
      title: "Number of Aduts",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "numberOfChildren",
      title: "Number of children",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "dimension",
      title: "Dimension",
      type: "string",
    }),
    defineField({
      name: "numberOfBeds",
      title: "Number Of Beds",
      type: "number",
      validation: (Rule) => Rule.min(1),
      initialValue: 1,
    }),
    defineField({
      name: "offeredAmenities",
      title: "Offered Amenities",
      type: "array",
      icon: JoystickIcon,
      of: [
        {
          type: "reference",
          to: [{ type: "amenity" }],
        },
      ],
    }),
    defineField({
      name: "isBooked",
      title: "Is Booked",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "specialNote",
      title: "Special Note",
      type: "text",
      validation: (Rule) => Rule.required(),
      initialValue:
        "Check-in time is 12:00 PM, checkout time is 11:59 AM. If you leave behind any items, please contact the receptionist.",
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "review" }],
    }),
  ],
});
