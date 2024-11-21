import { accountType } from "./accountType";
import { amenityType } from "./amenityType";
import { bookingType } from "./bookingType";
import { hotelRoomType } from "./hotelRoomType";
import { reviewType } from "./reviewType";
import { userType } from "./userType";
import { verificationTokenType } from "./verificationTokenType";

export const schemaTypes = [
  amenityType,
  hotelRoomType,
  bookingType,
  reviewType,
  userType,
  accountType,
  verificationTokenType,
];
