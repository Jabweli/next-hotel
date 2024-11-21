"use client";
import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | null;
  name: string;
  price: number;
  discount: number;
  adults: number;
  noOfChildren: number;
  specialNote: string;
  isBooked: boolean;
  handleBookNowClick: () => void;
};

const BookingForm: FC<Props> = (props) => {
  const {
    name,
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNowClick,
  } = props;

  const discountPrice = price - (price / 100) * discount;

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <>
      <div className="bg-[#f5f5f5] dark:bg-[#1a1919] rounded-2xl px-5 py-3">
        <h2 className="font-semibold text-lg">Book This Room Now</h2>
        <p className="text-[12px] text-black/40 dark:text-white/40">{name}</p>
        <p className="mt-3 text-[12px]">
          <span
            className={`font-bold text-[24px] text-black dark:text-white ${discount ? "line-through" : ""} `}
          >
            ${price}
          </span>{" "}
          Night{" "}
          {discount && (
            <span className="font-bold text-black dark:text-white text-[14px]">
              | discount {discount}%. Now{" "}
              <span className="text-tertiary-dark text-[20px]">
                ${discountPrice}
              </span>
            </span>
          )}
        </p>

        <div className="flex flex-row flex-wrap border border-b border-gray dark:border-white/30 rounded-xl mt-2">
          <div className="w-1/2 p-4 border-r border-gray dark:border-white/30 lg:rounded-bl-xl">
            <p className="text-[15px] font-semibold">Check In</p>
            <DatePicker
              selected={checkinDate}
              onChange={(date) => setCheckinDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              id="check-in-date"
              className="w-full bg-transparent text-sm focus:outline-none text-black/50 dark:text-white/50"
              placeholderText="dd/mm/yyyy"
            />
          </div>

          <div className="w-1/2 p-4 border-gray dark:border-white/30">
            <p className="text-[15px] font-semibold">Check Out</p>
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
              dateFormat="dd/MM/yyyy"
              disabled={!checkinDate}
              minDate={calcMinCheckoutDate()!}
              id="check-out-date"
              className="w-full bg-transparent text-sm focus:outline-none text-black/50 dark:text-white/50"
              placeholderText="dd/mm/yyyy"
            />
          </div>

          <div className="w-full p-4 border-t border-gray dark:border-white/30">
            <p className="text-[15px] font-semibold">Adults</p>
            <input
              type="number"
              name="checkin"
              value={adults}
              onChange={(e) => setAdults(+e.target.value)}
              min={1}
              max={5}
              placeholder="1"
              className="w-full bg-transparent text-sm focus:outline-none text-black/50 dark:text-white/50 border border-gray dark:border-white/30 p-2 rounded-lg"
            />

            <p className="text-[15px] font-semibold mt-4">Children</p>
            <input
              type="number"
              name="checkin"
              value={noOfChildren}
              onChange={(e) => setNoOfChildren(+e.target.value)}
              min={0}
              max={3}
              placeholder="0"
              className="w-full bg-transparent text-sm focus:outline-none text-black/50 dark:text-white/50 border border-gray dark:border-white/30 p-2 rounded-lg"
            />
          </div>
        </div>

        <h2 className="mt-5 font-semibold text-base">Special Note</h2>
        <div className="border border-b border-gray dark:border-white/30 rounded-xl mt-2">
          <div className="py-3 px-5 border-b border-gray dark:border-white/30">
            <p className="text-sm">
              Non-refundable - <span className="font-bold">$116</span>
            </p>
          </div>
          <div className="py-3 px-5">
            <p className="text-[13px]">{specialNote}</p>
          </div>
        </div>

        <div>
          {calcNoOfDays() > 0 ? (
            <div className="mt-4 flex flex-row items-center justify-between">
              <p className="font-bold text-sm">Total Before Taxes:</p>
              <p className="font-bold text-sm">
                {calcNoOfDays() * discountPrice}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <button
        type="button"
        disabled={isBooked}
        onClick={handleBookNowClick}
        className={`w-full text-center mt-4 p-3 rounded-xl font-semibold ${isBooked ? "disabled:bg-tertiary-light disabled:cursor-not-allowed" : "bg-tertiary-dark hover:bg-tertiary-light"}`}
      >
        {isBooked ? "BOOKED" : "BOOK NOW"}
      </button>
    </>
  );
};

export default BookingForm;
