import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const bookingType = defineType({
  name: "booking",
  title: "Booking",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hotelRoom",
      title: "Hotel Room",
      type: "reference",
      to: [{ type: "hotelRoom" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "checkinDate",
      title: "Check-in Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "checkoutDate",
      title: "Check-out Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "numberOfDays",
      title: "Number of Days",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "adults",
      title: "Adults",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "children",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "totalPrice",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
  ],
});
