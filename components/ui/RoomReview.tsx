import axios from "axios";
import { FC } from "react";
import useSWR from "swr";

import { ReviewType } from "@/types";
import Rating from "./Rating";

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get<ReviewType[]>(`/api/reviews/${roomId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR("/api/reviews", fetchRoomReviews);

  if (error) throw new Error("Cannot fetch data");
  if (typeof roomReviews === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  console.log(roomReviews);

  return (
    <>
      {roomReviews ? (
        roomReviews.map((review) => (
          <div
            className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
            key={review._id}
          >
            <div className="font-semibold mb-2 flex">
              <p>{review.user.name}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                <Rating rating={review.userRating} keyName={review._id} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))
      ) : (
        <div>
          <p className="font-semibold">No reviews</p>
        </div>
      )}
    </>
  );
};

export default RoomReview;
