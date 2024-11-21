import AnimatedText from "@/components/ui/AnimatedText";
import { Metadata } from "next";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
  title: "Contact | Hotel Management App",
  description:
    "Contact us for any queries your may have about your next booking",
};

export default function Page() {
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row h-auto xl:h-[35vh]">
        <div className="w-full lg:w-[50%] pt-28 px-4 md:pt-20 lg:pl-[30px] xl:pl-[50px] container mx-auto">
          <div className="flex flex-col justify-end">
            <AnimatedText
              title="Contact Us Today"
              classname="text-4xl md:text-5xl font-black text-wrap"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
            className="font-bold"
          >
            Let's get acquainted!
          </motion.p>
        </div>

        <div className="hero-right pt-8 lg:pt-20 w-full lg:w-[50%] h-[35vh] lg:h-auto mr-3 mt-3 relative lg:rounded-r-[20px]"></div>
      </div>
    </section>
  );
}
