"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import AnimatedText from "@/components/ui/AnimatedText";
import RoomCard from "@/components/ui/RoomCard";
import Search from "@/components/ui/Search";
import { getAllRooms } from "@/lib/apis";
import * as motion from "framer-motion/client";
import { RoomType } from "@/types";

export default function Page() {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const roomType = searchParams.get("roomType");
    const searchQuery = searchParams.get("searchQuery");

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, []);

  async function fetchData() {
    return getAllRooms();
  }

  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);
  if (error) throw new Error("Cannot fetch data");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  const filterRooms = (rooms: RoomType[]): RoomType[] => {
    return rooms.filter((room) => {
      // Apply room type filter

      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      //   Apply search query filter
      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // check number of adults
      if (adults && adults < room.numberOfAdults) {
        return false;
      }

      // check number of children
      if (children && children < room.numberOfChildren) {
        return false;
      }

      return true;
    });
  };

  const filteredRooms = filterRooms(data || []);

  return (
    <section className="">
      <div className="flex flex-col lg:flex-row h-auto xl:h-[35vh]">
        <div className="w-full lg:w-[50%] pt-28 px-4 md:pt-20 lg:pl-[30px] xl:pl-[50px] container mx-auto">
          <div className="flex flex-col justify-end">
            <AnimatedText
              title="Our Hotel Rooms"
              classname="text-4xl md:text-5xl font-black text-wrap"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
            className="font-bold"
          >
            Search the best hotel rooms!
          </motion.p>
        </div>

        <div className="hero-right pt-8 lg:pt-20 w-full lg:w-[50%] h-[35vh] lg:h-auto mr-3 mt-3 relative lg:rounded-r-[20px]"></div>
      </div>

      <div className="container px-4 py-10 mx-auto">
        <Search
          roomTypeFilter={roomTypeFilter}
          setRoomTypeFilter={setRoomTypeFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
        />
        <div className="flex flex-col lg:flex-row justify-between gap-6 mt-10">
          <div className="w-full flex flex-wrap items-center gap-[10px] justify-betweendd">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                containerStyles="w-full md:w-[48%] xl:w-[24%] mb-6"
                detailStyles="xl:w-[85%] left-4 -mt-20"
                imgStyles="lg:h-[330px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
