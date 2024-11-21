import { FC } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

type Props = {
  rating: number;
  keyName: string;
};

const Rating: FC<Props> = ({ rating, keyName }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const fullStarElements = Array(fullStars).fill(<FaStar />);

  let halfStarElement = null;

  if (decimalPart > 0) {
    halfStarElement = <FaStarHalf />;
  }

  return (
    <span key={keyName} className="flex">
      {fullStarElements} {halfStarElement}
    </span>
  );
};

export default Rating;
