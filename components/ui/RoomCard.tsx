import { urlBuilder } from "@/lib/apis";
import { RoomType } from "@/types";
import { StarFilledIcon, UserIcon } from "@sanity/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiBed } from "react-icons/bi";
import { PiPerson } from "react-icons/pi";

interface Props {
  room: RoomType;
  containerStyles?: string;
  detailStyles?: string;
  imgStyles?: string;
}

export default function RoomCard({
  room,
  containerStyles,
  detailStyles,
  imgStyles,
}: Props) {
  const {
    name,
    price,
    coverImage,
    dimension,
    slug,
    numberOfBeds,
    numberOfAdults,
  } = room;
  return (
    <div className={`relative pb-3 ${containerStyles}`}>
      <div
        className={`w-full h-[350px] relative z-10 overflow-hidden rounded-3xl ${imgStyles}`}
      >
        <Image
          src={urlBuilder(coverImage.image)?.url()!}
          alt="room"
          width={coverImage.width}
          height={coverImage.height}
          className="object-cover z-1 w-full h-full rounded-3xl img-scale-animation"
        />
      </div>
      <div
        className={`bg-white/30 w-[85%] md:w-[75%] text-dark dark:bg-black/30 dark:text-white py-4 px-5 relative z-[1000] -mt-16 left-6 shadow-sm dark:shadow-white/20 backdrop-blur-lg backdrop-brightness-10 ${detailStyles}`}
      >
        <div className="flex flex-row items-center gap-x-3 mb-2 flex-wrap">
          <div className="flex flex-row items-center gap-1 text-[12px]">
            <BiBed /> <span className="font-medium">{numberOfBeds} Bed</span>
          </div>
          <div className="flex flex-row items-center gap-1 text-[12px]">
            <UserIcon />{" "}
            <span className="font-medium">{numberOfAdults} Adults</span>
          </div>
          <div className="flex flex-row items-center gap-1 text-[12px]">
            <PiPerson /> <span className="font-medium">{dimension}</span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <h2 className="font-semibold text-sm">{name}</h2>
          <div className="flex flex-row gap-[2px] items-center">
            <StarFilledIcon className="text-tertiary-dark" fontSize={18} />
            <span className="text-[12px]">4.89 (128)</span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between mt-2">
          <h2 className="font-bold text-xl">${price}</h2>
          <Link
            href={`/rooms/${slug.current}`}
            className="border border-gray dark:border-white/20 rounded-full text-[12px] px-4 py-2 uppercase"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
