import { ArrowTopRightIcon } from "@sanity/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCaretDown } from "react-icons/bi";
import AnimatedText from "./ui/AnimatedText";
import CountUp from "./ui/CountUp";
import * as motion from "framer-motion/client";

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row h-auto xl:h-[100vh] mb-24">
      {/* left */}
      <div className="w-full lg:w-[50%] pt-28 px-4 md:pt-20 lg:pl-[30px] xl:pl-[50px] container mx-auto">
        <div className="">
          <AnimatedText
            title="Explore Our Exquisite Hotel"
            classname="text-4xl md:text-5xl font-black text-wrap"
          />
        </div>
        <p className="font-bold">Let&rsquo;s get acquainted!</p>

        <div className="flex flex-col xl:flex-row mt-5 gap-5 w-full">
          <p className="hidden xl:block font-black">05</p>
          <p className="text-[15px]">
            We specialize in curating exceptional villa rentals, providing an
            unparalled level of comfort, privacy, and convenience for your dream
            vacation.
          </p>
          <div className="flex items-center">
            <Link
              href="/"
              className="bg-black text-white dark:bg-white dark:text-black rounded-full px-8 md:px-16 py-2 flex flex-row items-center justify-center font-bold btn-scale-animation"
            >
              More <ArrowTopRightIcon fontSize={20} />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-row gap-3 items-center justify-between mt-10">
          <div className="flex-1dd">
            <h2 className="text-3xl md:text-4xl font-bold">
              <CountUp value={115} />
              k+
            </h2>
            <p className="text-sm font-semibold">Capital Raised</p>
          </div>
          <div className="flex-1dd relative left-border right-border">
            <h2 className="text-3xl md:text-4xl font-bold">
              <CountUp value={70} />
              k+
            </h2>
            <p className="text-sm font-semibold">Happy Customers</p>
          </div>
          <div className="flex-1dd">
            <h2 className="text-3xl md:text-4xl font-bold">
              <CountUp value={47} />
              k+
            </h2>
            <p className="text-sm font-semibold">Property Options</p>
          </div>
        </div>

        <div className="w-full h-40 mt-10 flex flex-row gap-x-4">
          <div className="relative flex-1 overflow-hidden rounded-xl">
            <Image
              src="/hero_1.jpg"
              alt="hotel"
              fill
              className="object-cover rounded-xl img-scale-animation"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </div>
          <div className="relative flex-1 overflow-hidden rounded-xl">
            <Image
              src="/7.jpg"
              alt="hotel"
              fill
              className="object-cover rounded-xl img-scale-animation"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* right */}
      <div className="hero-right pt-8 lg:pt-20 w-full lg:w-[50%] min-h-[370px] lg:h-auto mr-3 mt-3 relative lg:rounded-r-[20px]">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeOut", staggerChildren: 0.5 },
          }}
          viewport={{ once: true }}
          className="flex flex-row justify-between w-[240px] h-24 px-[5px] py-[6px] bg-white rounded-2xl ml-4 lg:ml-20 shadow-lg btn-scale-animation"
        >
          <div className="relative text-black pl-2">
            <p className="font-semibold text-sm mb-0 pb-0">Deluxe Suite,</p>
            <p className="text-[12px] text-black/50 font-semibold pt-0 mt-0">
              Luxury
            </p>
            <Link
              href="/"
              className="absolute left-1 bottom-1 w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
            >
              <ArrowTopRightIcon className="text-white" fontSize={20} />
            </Link>
          </div>
          <div className="relative w-[100px] h-full">
            <Image
              src="/bg.jpg"
              alt="bedroom"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:py-10 lg:px-20 bg-black/20">
          <p className="mb-5 text-sm text-white pl-3 relative before:absolute before:h-2/3 before:w-[2px] before:bg-white/40 before:top-[50%] before:-translate-y-[50%] before:-left-2 rounded-full">
            Enjoy a luxurious vacation in a villa with breathtaking city views
            and easy access to the vibrant city life and culinary delights.
          </p>

          <div className="flex flex-row flex-wrap items-center justify-between">
            <div className="flex flex-row gap-2">
              <span className="flex flex-row items-center justify-center bg-white text-black rounded-full py-2 px-3 text-sm w-28 cursor-pointer">
                Select type <BiCaretDown />
              </span>
              <span className="flex flex-row items-center justify-center bg-white text-black rounded-full py-2 px-3 text-sm w-28 cursor-pointer">
                Location <BiCaretDown />
              </span>
            </div>

            <button
              type="button"
              className="w-28 px-3 py-2 text-white bg-transparent border border-white rounded-full text-sm mt-2 md:mt-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
