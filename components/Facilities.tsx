import React from "react";
import { BiHotel } from "react-icons/bi";
import { FaSwimmingPool } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { TbGymnastics } from "react-icons/tb";

export default function Facilities() {
  return (
    <section className="container px-4 lg:px-16 mx-auto pb-24">
      <div className="text-center mb-6">
        <h2 className="text-3xl lg:text-5xl font-bold">Hotel Facilities</h2>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-[10px]">
        <div className="facility-card">
          <BiHotel fontSize={60} className="dark:text-tertiary-dark" />
          <h3 className="text-lg font-semibold">Rooms & Suites</h3>
          <p className="text-[12px] font-normal">
            Varied types of rooms, from standard to luxury suites, equipped with
            essentials like beds.
          </p>
        </div>
        <div className="facility-card">
          <MdSecurity fontSize={60} className="dark:text-tertiary-dark" />
          <h3 className="text-lg font-semibold">24/7 Security</h3>
          <p className="text-[12px] font-normal">
            On-site security personnel and best surveillance. From standard to
            luxury suites for valuables.
          </p>
        </div>
        <div className="facility-card">
          <TbGymnastics fontSize={60} className="dark:text-tertiary-dark" />
          <h3 className="text-lg font-semibold">Fitness Center</h3>
          <p className="text-[12px] font-normal">
            Equipped with exercise machines and weights.Offering massages,
            facials, and other treatments.
          </p>
        </div>
        <div className="facility-card">
          <FaSwimmingPool fontSize={60} className="dark:text-tertiary-dark" />
          <h3 className="text-lg font-semibold">Swimming Pool</h3>
          <p className="text-[12px] font-normal">
            Indoor or outdoor pools for leisure or exercise.Offering massages,
            facials, and other treatments
          </p>
        </div>
      </div>
    </section>
  );
}
