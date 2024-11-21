"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoomCard from "./ui/RoomCard";
import Link from "next/link";
import { ArrowTopRightIcon } from "@sanity/icons";
import { getAllRooms } from "@/lib/apis";
import useSWR from "swr";

export default function Rooms() {
  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    className: "center",
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function fetchData() {
    return getAllRooms();
  }

  const { data, error, isLoading } = useSWR("get/allhotelrooms", fetchData);
  if (error) throw new Error("Cannot fetch data");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  return (
    <section className="pb-24">
      <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="w-full md:w-1/2">
          <Link
            href="/rooms"
            className="text-tertiary-dark w-fit flex flex-row gap-x-1 items-center border border-tertiary-dark rounded-full text-[12px] px-4 py-2 hover:bg-tertiary-dark hover:text-white transition-all font-bold"
          >
            More Rooms
            <ArrowTopRightIcon fontSize={20} />
          </Link>
          <p className="text-sm mt-3">
            Our rooms offer a harmonious blend of comfort and elegance, designed
            to provide an exceptional stay for every guest Each room features
            plush bedding.
          </p>
        </div>
        <div className="w-full md:w-1/2 text-left md:text-rightdd">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold">Your dream</h2>
            <h2 className="text-3xl lg:text-5xl font-bold ml-4">
              luxurious hotel room
            </h2>
          </div>
        </div>
      </div>

      <div className="px-16dd py-10">
        <Slider {...settings}>
          {data &&
            data.length > 0 &&
            data.map((room) => <RoomCard key={room._id} room={room} />)}
        </Slider>
      </div>
    </section>
  );
}
