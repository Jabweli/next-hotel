import { ClockIcon } from "@sanity/icons";
import Link from "next/link";
import { BiMessageDetail } from "react-icons/bi";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="mt-16dd">
      <div className="container mx-auto px-4">
        <Link href="/" className="font-black text-tertiary-dark text-2xl">
          Hotelzz
        </Link>

        <h4 className="font-semibold text-[40px] pt-6">Contact</h4>

        <div className="flex flex-wrap justify-between gap-6 mt-3">
          <div className="flex-1">
            <p>123 Road - Hannington Street</p>
            <div className="flex items-center py-4">
              <BsFillSendFill className="cursor-pointer" />
              <p className="ml-2">Stanley Omali</p>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound className="cursor-pointer" />
              <p className="ml-2">00-000-00</p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail className="cursor-pointer" />
              <p className="ml-2">example@email.com</p>
            </div>
          </div>

          <div className="flex-1 md-text-right">
            <p className="pb-4">Our story</p>
            <p className="pb-4">Get in touch</p>
            <p className="pb-4">Our Privacy Commitment</p>
            <p className="pb-4">Terms of Service</p>
            <p className="pb-0">Customer Assistance</p>
          </div>

          <div className="flex-1 md-text-right">
            <p className="pb-4">Dining Experience</p>
            <p className="pb-4">Wellness</p>
            <p className="pb-4">Fitness</p>
            <p className="pb-4">Sports</p>
            <p className="pb-0">Events</p>
          </div>

          <div className="flex-1 md-text-right">
            <p className="pb-4">Opening Hours</p>
            <p className="pb-4 flex items-center gap-x-1">
              <ClockIcon fontSize={20} />{" "}
              <span className="text-sm">Mon - Fri : 8pm - 12am</span>
            </p>
            <p className="pb-4 flex items-center gap-x-1">
              <ClockIcon fontSize={20} />{" "}
              <span className="text-sm">Saturday : 8am - 6pm</span>
            </p>
            <p className="pb-4 flex items-center gap-x-1">
              <ClockIcon fontSize={20} />{" "}
              <span className="text-sm">Sunday : 8am - 6pm</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-tertiary-light h-10 md:h-[50px] mt-16 w-full bottom-0 left-0 flex items-center justify-center px-4">
        <p>Copyrights &copy; All rights reserved</p>
      </div>
    </footer>
  );
}
