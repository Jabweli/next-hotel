"use client";
import { getUserBookings } from "@/lib/apis";
import { UserType } from "@/types";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import Table from "@/components/ui/Table";
import RatingModal from "@/components/ui/RatingModal";
import BackDrop from "@/components/ui/BackDrop";
import Chart from "@/components/ui/Chart";
import toast from "react-hot-toast";

type Params = { id: string };

export default function AccountPage(props: { params: Promise<Params> }) {
  const [currentNav, setCurrentNav] = useState<
    "bookings" | "amount" | "ratings"
  >("bookings");

  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");

  const toggleRatingModal = () => setIsRatingVisible((prevState) => !prevState);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error("Please provide a rating text and a rating");
    }

    if (!roomId) toast.error("Id not provided");

    setIsSubmittingReview(true);

    try {
      const { data } = await axios.post("/api/users", {
        reviewText: ratingText,
        ratingValue,
        roomId,
      });
      toast.success("Review Submitted");
    } catch (error) {
      toast.error("Review Failed");
    } finally {
      setRatingText("");
      setRatingValue(null);
      setRoomId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  const { params } = props;
  const { id: userId } = use(params);

  const fetchUserBooking = async () => getUserBookings(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<UserType>("/api/users");
    return data;
  };

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userbooking", fetchUserBooking);

  const {
    data: userData,
    isLoading: loadingUserData,
    error: errorGettingUserData,
  } = useSWR("/api/users", fetchUserData);

  if (error || errorGettingUserData) throw new Error("Cannot fetch data");
  if (typeof userBookings === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");
  if (typeof userData === "undefined" && !loadingUserData)
    throw new Error("Cannot fetch data");

  if (loadingUserData) return <LoadingSpinner />;
  if (!userData) throw new Error("Cannot fetch data");
  if (!userData) throw new Error("Cannot fetch data");

  return (
    <div className="container mx-auto px-4 pb-10 pt-32">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-sm h-fit sticky top-10 bg-[#f5f5f5] dark:bg-[#1a1919] text-black rounded-lg px-6 py-4">
          <div className="md:w-[143px]dd w-20 h-20 md:h-[143px]dd mx-auto mb-2 rounded-full overflow-hidden">
            <Image
              src={userData.image}
              alt={userData.name}
              width={143}
              height={143}
              className="img scale-animation rounded-full w-full h-full"
            />
          </div>
          <div className="font-normal text-center">
            <h6 className="text-xl font-bold text-black dark:text-white">
              {userData.name}
            </h6>
            <p className="text-sm text-black dark:text-white">
              {userData.email}
            </p>
          </div>
          <div className="font-normal py-4 text-left">
            <p className="text-xl text-black dark:text-white font-bold pb-1">
              About
            </p>
            <p className="text-sm text-black/50 dark:text-white/50">
              {userData.about ?? "No profile description"}
            </p>
          </div>

          <div className="flex items-center">
            <p className="mr-2 text-black dark:text-white">Sign Out</p>
            <FaSignOutAlt
              className="cursor-pointer text-black dark:text-white"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">Hello, {userData.name}</h5>
          </div>
          <div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden">
            <Image
              className="img scale-animation rounded-full"
              width={56}
              height={56}
              src={userData.image}
              alt="User  Name"
            />
          </div>
          <p className="block w-fit md:hidden text-sm py-2">
            {userData.about ?? ""}
          </p>

          <p className="text-xs py-2 font-medium">
            Joined In {userData._createdAt.split("T")[0]}
          </p>
          <div className="md:hidden flex items-center my-2">
            <p className="mr-2">Sign out</p>
            <FaSignOutAlt
              className="cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>

          <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7">
            <ol
              className={`${
                currentNav === "bookings"
                  ? "text-tertiary-dark"
                  : "text-gray-700"
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav("bookings")}
                className="inline-flex items-center cursor-pointer"
              >
                <BsJournalBookmarkFill />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Current Bookings
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === "amount"
                  ? "text-tertiary-dark font-semibold"
                  : "text-gray-700"
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav("amount")}
                className="inline-flex items-center cursor-pointer"
              >
                <GiMoneyStack />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === "bookings" ? (
            userBookings && (
              <Table
                bookingDetails={userBookings}
                setRoomId={setRoomId}
                toggleRatingModal={toggleRatingModal}
              />
            )
          ) : (
            <></>
          )}

          {currentNav === "amount" ? (
            userBookings && <Chart userBookings={userBookings} />
          ) : (
            <></>
          )}
        </div>
      </div>

      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={isSubmittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} />
    </div>
  );
}
