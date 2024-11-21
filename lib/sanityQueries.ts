import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0]{
  _id,
  name,
  description,
  price,
  isFeatured,
  coverImage,
  gallery,
  discount,
  slug,
  offeredAmenities[]->{
    _id,
    name,
    icon
  },
  numberOfBeds,
}`;

export const getAllRoomsQuery = groq`*[_type == "hotelRoom"]{
  _id, 
  coverImage,
  dimension,
  isBooked,
  isFeatured,
  name,
  price,
  slug,
  type,
  numberOfBeds,
  numberOfAdults,
  numberOfChildren
}`;

export const getSingleRoomQuery = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
  _id,
  coverImage,
  description,
  dimension,
  discount,
  gallery,
  isBooked,
  isFeatured,
  name,
  numberOfBeds,
  offeredAmenities[]->{
    _id,
    name,
    icon
  },
  price,
  slug,
  specialNote,
  type,
  numberOfAdults,
  numberOfChildren
}`;

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
  _id,
  hotelRoom -> {
    _id,
    name,
    slug,
    price
  },
  checkinDate,
  checkoutDate,
  numberOfDays,
  adults,
  children,
  totalPrice,
  discount
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
  _id,
  name,
  email,
  isAdmin,
  about,
  _createdAt,
  image,
}`;

export const getRoomReviewsQuery = groq`*[_type == "review" && hotelRoom._ref == $roomId] {
  _createdAt,
  _id,
  text,
  user -> {
    name
  },
  userRating
}`;
