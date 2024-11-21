import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="container mx-auto pb-24 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <h2 className="text-3xl lg:text-5xl font-bold">Giving the</h2>
          <h2 className="text-3xl lg:text-5xl font-bold ml-4">
            the best just for you
          </h2>
        </div>

        <button
          type="button"
          className="w-24 h-24 rounded-full p-5 text-center bg-black text-white dark:bg-[#f5f5f5] dark:text-black font-semibold shadow-2xl"
        >
          Watch Video
        </button>
      </div>

      <div className="mt-10 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2">
          <Image
            src="/about.png"
            alt="about"
            width={643}
            height={532}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h3 className="text-tertiary-dark font-semibold">
            Welcome to our hotel
          </h3>
          <h2 className="text-4xl lg:text-6xl font-bold py-5">
            Enjoy Your Stay at Our Hotel
          </h2>
          <p className="font-semibold pb-4 text-lg lg:text-[22px]">
            Discover exclusive savings and distinct offerings at iconic
            destinations spanning coast to coast.
          </p>
          <p className="text-base mb-10 text-[14px]">
            Crafting a truly satisfying and meaningful journey is the result of
            an art that humanises travel on a much deeper level, an art that
            we&apos;re very proud to have won awards for, with a team who are
            intensely passionate about your whole experience and devoted to how
            we make you feel.
          </p>

          <Link href="/rooms" className="bg-tertiary-dark py-3 px-8 rounded-md">
            BOOK NOW
          </Link>
        </div>
      </div>
    </section>
  );
}
