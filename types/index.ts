import { ChangeEvent } from "react";

export interface FormInputProps {
  type: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  otherStyles?: string;
  value: string | number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomButtonProps {
  title: string;
  btnStyles?: string;
  type: "button" | "submit";
}

// sanity api types
export type CoverImage = {
  image: string;
  altText: string;
  width: number;
  height: number;
};

export type ImageType = {
  _key: string;
  image: string;
  altText: string;
  width: number;
  height: number;
};

type Amenity = {
  _id: string;
  name: string;
  icon: string;
};

type Slug = {
  _type: string;
  current: string;
};

export type RoomType = {
  _id: string;
  coverImage: CoverImage;
  description: string;
  dimension: string;
  discount: number;
  gallery: ImageType[];
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  price: number;
  slug: Slug;
  specialNote: string;
  type: string;
  numberOfAdults: number;
  numberOfChildren: number;
};

export type CreateBookingType = {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};

export type BookingType = {
  _id: string;
  hotelRoom: {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
  };
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  about: string | null;
  _createdAt: string;
  image: string;
};

export type UpdateReviewType = {
  reviewId: string;
  reviewText: string;
  userRating: number;
};

export type CreateReviewType = {
  hotelRoomId: string;
  reviewText: string;
  userRating: number;
  userId: string;
};

export type ReviewType = {
  text: string;
  user: { name: string };
  userRating: number;
  _createdAt: Date;
  _id: string;
};
