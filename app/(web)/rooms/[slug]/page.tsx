"use client";
import { use, useState } from "react";
import axios from "axios";
import { ShareIcon } from "@sanity/icons";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { BiArea, BiBookBookmark, BiDotsHorizontal } from "react-icons/bi";
import { BsFlower1 } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { MdOutlineCleaningServices, MdWoman } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { TbMoodKid } from "react-icons/tb";
import { GiSmokeBomb } from "react-icons/gi";
import BookingForm from "@/components/BookingForm";
import PhotoGallery from "@/components/PhotoGallery";
import { getSingleRoom } from "@/lib/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import toast from "react-hot-toast";
import { getStripe } from "@/lib/stripe";
import RoomReview from "@/components/ui/RoomReview";

type Params = { slug: string };

export default function Page(props: { params: Promise<Params> }) {
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const { params } = props;
  const { slug } = use(params);

  const fetchRoom = async () => getSingleRoom(slug);

  const { data: room, error, isLoading } = useSWR("api/room", fetchRoom);

  if (error) throw new Error("Cannot fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error("Please provide checkin / checkout date");

    if (checkinDate > checkoutDate)
      return toast.error("Please choose a valid checkin period");

    const numberOfDays = calcNumDays();

    const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Payment Failed");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occured");
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <section className="container mx-auto px-4 pt-24 lg:pt-20 pb-16">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* left side */}
        <div className="w-full lg:w-[70%] flex flex-col gap-3">
          <PhotoGallery gallery={room.gallery} />

          <div className="flex flex-row flex-wrap items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">{room.name}</h1>
              <p className="text-sm text-black/30 dark:text-white/50 font-semibold">
                Palm Jumeriah, Dubai Marina
              </p>
            </div>

            <div className="flex flex-row gap-x-2">
              <div className="w-8 h-8 flex items-center justify-center border border-gray dark:border-white/30 rounded-full text-black/40 dark:text-white/50">
                <ShareIcon fontSize={20} />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-gray dark:border-white/30 rounded-full text-black/40 dark:text-white/50">
                <BiBookBookmark />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-gray dark:border-white/30 rounded-full text-black/40 dark:text-white/50">
                <BiDotsHorizontal />
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap border border-b-0 border-gray dark:border-white/30 rounded-xl mt-2">
            <div className="flex-1 p-4 border-r border-b border-gray dark:border-white/30 lg:rounded-bl-xl">
              <h2 className="text-black/30 dark:text-white/50 font-semibold mb-1">
                Bed room
              </h2>
              <p className="flex flex-row gap-x-2 items-center">
                <FaBed
                  fontSize={22}
                  className="text-black/50 dark:text-white/50"
                />
                <span className="font-bold">{room.numberOfBeds}</span>
              </p>
            </div>

            <div className="flex-1 p-4 border-r border-b border-gray dark:border-white/30">
              <h2 className="text-black/30 dark:text-white/50 font-semibold mb-1">
                Bath room
              </h2>
              <p className="flex flex-row gap-x-2 items-center">
                <BsFlower1
                  fontSize={22}
                  className="text-black/50 dark:text-white/50"
                />
                <span className="font-bold">2</span>
              </p>
            </div>

            <div className="flex-1 p-4 border-r border-b border-gray dark:border-white/30">
              <h2 className="text-black/30 dark:text-white/50 font-semibold mb-1">
                Dimensions
              </h2>
              <p className="flex flex-row gap-x-2 items-center">
                <BiArea
                  fontSize={22}
                  className="text-black/50 dark:text-white/50"
                />
                <span className="font-bold">{room.dimension}</span>
              </p>
            </div>

            <div className="flex-1 p-4 border-r border-b border-gray dark:border-white/30">
              <h2 className="text-black/30 dark:text-white/50 font-semibold mb-1">
                Adults
              </h2>
              <p className="flex flex-row gap-x-2 items-center">
                <MdWoman
                  fontSize={22}
                  className="text-black/50 dark:text-white/50"
                />
                <span className="font-bold">{room.numberOfAdults} adults</span>
              </p>
            </div>

            <div className="flex-1 p-4 border-b border-gray dark:border-white/30 rounded-br-xl">
              <h2 className="text-black/30 dark:text-white/50 font-semibold mb-1">
                Children
              </h2>
              <p className="flex flex-row gap-x-2 items-center">
                <TbMoodKid
                  fontSize={22}
                  className="text-black/50 dark:text-white/50"
                />
                <span className="font-bold">{room.numberOfChildren} kids</span>
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="font-bold text-xl">Description</h2>
            <p className="mt-3 text-[15px] text-[#1b1b1b] dark:text-white/50">
              {room.description}
              {/* <span className="text-black dark:text-white font-semibold">
                Show more
              </span> */}
            </p>
          </div>

          <div className="mt-2 mb-4">
            <h2 className="font-bold text-xl">Amenities</h2>

            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
              {room.offeredAmenities.map((amenity) => (
                <div
                  className="flex flex-row gap-x-2 items-center"
                  key={amenity._id}
                >
                  <i
                    className={`${amenity.icon} text-black/50 dark:text-white/70`}
                  ></i>
                  <span className="md:text-base text-sm text-[#1b1b1b] dark:text-white/50">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-11">
            <h2 className="font-bold text-xl mb-2">Safety And Hygiene</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2">
              <div className="flex items-center my-1 md:my-0">
                <MdOutlineCleaningServices fontSize={22} />
                <p className="ml-2 md:text-base text-xs text-[#1b1b1b] dark:text-white/50">
                  Daily Cleaning
                </p>
              </div>
              <div className="flex items-center my-1 md:my-0">
                <LiaFireExtinguisherSolid fontSize={22} />
                <p className="ml-2 md:text-base text-sm text-[#1b1b1b] dark:text-white/50">
                  Fire Extinguishers
                </p>
              </div>
              <div className="flex items-center my-1 md:my-0">
                <AiOutlineMedicineBox fontSize={22} />
                <p className="ml-2 md:text-base text-sm text-[#1b1b1b] dark:text-white/50">
                  Disinfections and Sterilizations
                </p>
              </div>
              <div className="flex items-center my-1 md:my-0">
                <GiSmokeBomb fontSize={22} />
                <p className="ml-2 md:text-base text-sm text-[#1b1b1b] dark:text-white/50">
                  Smoke Detectors
                </p>
              </div>
            </div>
          </div>

          <div className="shadow dark:shadow-white rounded-lg p-6">
            <div className="items-center mb-4">
              <p className="md:text-lg font-semibold">Customer Reviews</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RoomReview roomId={room._id} />
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full lg:w-[30%] mt-8 lg:mt-0">
          <BookingForm
            name={room.name}
            price={room.price}
            discount={room.discount}
            specialNote={room.specialNote}
            checkinDate={checkinDate}
            setCheckinDate={setCheckinDate}
            checkoutDate={checkoutDate}
            setCheckoutDate={setCheckoutDate}
            calcMinCheckoutDate={calcMinCheckoutDate}
            adults={adults}
            noOfChildren={noOfChildren}
            setAdults={setAdults}
            setNoOfChildren={setNoOfChildren}
            isBooked={room.isBooked}
            handleBookNowClick={handleBookNowClick}
          />
        </div>
      </div>
    </section>
  );
}
