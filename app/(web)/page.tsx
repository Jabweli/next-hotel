import About from "@/components/About";
import Facilities from "@/components/Facilities";
import FeaturedRoom from "@/components/FeaturedRoom";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Rooms from "@/components/Rooms";
import { getFeaturedRoom } from "@/lib/apis";

export default async function Home() {
  const featuredRoom = await getFeaturedRoom();
  return (
    <>
      <Hero />
      <About />
      <Rooms />
      <Facilities />
      <FeaturedRoom featuredRoom={featuredRoom} />
      <Gallery />
    </>
  );
}
