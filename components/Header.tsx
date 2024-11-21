"use client";
import ThemeContext from "@/context/ThemeContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Header() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  return (
    <header className="py-7 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrapdd items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex flex-wrap items-center justify-between w-full md:w-[45%] bg-green-200dd">
        <Link href="/" className="font-black text-tertiary-dark">
          Hotelzz
        </Link>
        <ul className="flex items-center gap-x-2 md:gap-x-8 md:mt-0">
          <li className="hover:-translate-y-2 hover:text-tertiary-dark duration-300 transition-all">
            <Link href="/" className="text-base">
              Home
            </Link>
          </li>
          <li className="hover:-translate-y-2 hover:text-tertiary-dark duration-300 transition-all">
            <Link href="/rooms" className="text-base">
              Rooms
            </Link>
          </li>
          <li className="hover:-translate-y-2 hover:text-tertiary-dark duration-300 transition-all">
            <Link href="/gallery" className="text-base">
              Gallery
            </Link>
          </li>
        </ul>
      </div>

      <div className="md:w-[55%]">
        <ul className="flex items-center justify-start md:justify-end">
          <li className="bg-black dark:bg-white px-8 py-1 rounded-full flex items-center justify-center mr-2 hover:bg-tertiary-dark hover:text-white transition-all">
            <Link
              href="/contact"
              className="text-sm text-white dark:text-black"
            >
              Contact
            </Link>
          </li>
          <li className="flex items-center">
            {session?.user ? (
              <Link href={`/account/${session?.user.id}`}>
                {session.user.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className="scale-animation img"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            ) : (
              <Link href="/login">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>
          <li className="ml-2 flex items-center">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
