"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoomType } from "@/types";
import { urlBuilder } from "@/lib/apis";
import { ArrowTopRightIcon } from "@sanity/icons";
import { TbAirConditioning } from "react-icons/tb";

type Props = {
  featuredRoom: RoomType;
};

const FeaturedRoom: FC<Props> = (props) => {
  const { featuredRoom } = props;
  console.log(featuredRoom);
  return (
    <section className="flex md:flex-row flex-col px-4 pb-24 items-center gap-12 container mx-auto">
      <div className="flex-1 md:grid gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-56 mb-4 md:mb-0">
          <Image
            src={urlBuilder(featuredRoom.coverImage.image)?.url() || "/4.jpg"}
            alt={featuredRoom.coverImage.altText}
            width={featuredRoom.coverImage.width}
            height={featuredRoom.coverImage.height}
            className="img img-scale-animation"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 h-48">
          {featuredRoom.gallery.slice(1, 3).map((image) => (
            <div key={image._key} className="rounded-2xl overflow-hidden">
              <Image
                src={urlBuilder(image.image)?.url() || "/4.jpg"}
                alt={image.altText}
                width={image.width}
                height={image.height}
                className="img img-scale-animation"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 md:py-10 md:w-1/2 text-left">
        <h3 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-6">
          Featured Room
        </h3>
        <h4>{featuredRoom.name}</h4>
        <div className="mt-3 flex flex-wrap justify-betweendd gap-x-4 gap-y-2 mb-6">
          {featuredRoom.offeredAmenities.map((amenity) => (
            <div
              className="flex flex-row gap-x-2 items-center"
              key={amenity._id}
            >
              <TbAirConditioning
                fontSize={16}
                className="text-black/50 dark:text-white/50"
              />
              <span className="font-normal text-sm">{amenity.name}</span>
            </div>
          ))}
        </div>

        <p className="font-normal max-w-md">{featuredRoom.description}</p>

        <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
          <div className="flex mb-3 md:mb-0 lg:justify-between">
            <div className="flex gap-3 flex-col mr-4">
              <p className="text-xs lg:text-sm">Start From</p>
              <p className="md:font-bold flex font-medium text-lg xl:text-5xl">
                ${featuredRoom.price}
              </p>
            </div>
            <div className="flex gap-3 flex-col justify-center mr-4 lg:ml-10">
              <p className="text-xs lg:text-sm">Discount</p>
              <p className="md:font-bold flex font-medium text-lg xl:text-5xl">
                ${featuredRoom.discount}
              </p>
            </div>
          </div>

          <Link
            href={`/rooms/${featuredRoom.slug.current}`}
            className="border w-fit h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-full font-bold text-sm flex flex-row gap-x-1 items-center"
          >
            More Details
            <ArrowTopRightIcon fontSize={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoom;
