"use client";
import FormInput from "@/components/ui/FormInput";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BiCaretDown } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowTopRightIcon } from "@sanity/icons";

const defaultFormData = {
  name: "",
  email: "",
  password: "",
};

export default function Page() {
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/");
    } catch (_error) {
      toast.error("Something wen't wrong");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Success!. Now login to your account");
      }
    } catch (error) {
      toast.error("Something went wrong, try again!");
    } finally {
      setFormData(defaultFormData);
    }
  };
  return (
    <section className="flex flex-col lg:flex-row h-auto xl:h-[100vh]">
      {/* left */}
      <div className="w-full lg:w-[50%] pt-28 px-4 md:pt-20 lg:pl-[30px] xl:pl-[50px] container mx-auto">
        <div className="md:p-6dd space-y-4  md:space-y-6 sm:p-6dd">
          <div className="w-full md:w-[80%] mx-auto">
            <h1 className="text-xl leading-tight tracking-tight md:text-[32px] font-bold">
              Create Account
            </h1>
            <p>
              Already have an account?{" "}
              <span
                onClick={loginHandler}
                className="text-tertiary-dark cursor-pointer"
              >
                Login
              </span>
            </p>

            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="w-full">
                <p className="text-sm">Username</p>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="John Doe *"
                  required={true}
                  otherStyles="focus:outline-none"
                  value={formData.name}
                  handleChange={handleInputChange}
                />
              </div>
              <div className="w-full mt-5">
                <p className="text-sm">Email</p>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="you@example.com *"
                  required={true}
                  otherStyles="focus:outline-none"
                  value={formData.email}
                  handleChange={handleInputChange}
                />
              </div>
              <div className="w-full mt-5">
                <p className="text-sm">Password</p>
                <FormInput
                  type="password"
                  name="password"
                  placeholder="6 characters or more*"
                  required={true}
                  otherStyles="focus:outline-none"
                  value={formData.password}
                  handleChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 rounded-[8px] text-base py-[15px] px-[40px] bg-tertiary-dark text-white font-semibold hover:bg-tertiary-light"
              >
                Sign Up
              </button>

              <div className="w-full mt-6">
                <p className="relative text-center text-[#b6b6b6] after:absolute after:w-[38%] after:h-[1px] after:bg-[#eee] after:right-0 after:top-[50%] after:-translate-[50%] before:absolute before:w-[38%] before:h-[1px] before:bg-[#eee] before:left-0 before:top-[50%] before:-translate-[50%]">
                  or sign up with
                </p>
                <div className="w-full inline-flex items-center justify-center pt-3">
                  <AiFillGithub
                    onClick={loginHandler}
                    className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
                  />
                  <FcGoogle
                    onClick={loginHandler}
                    className="ml-3 text-4xl cursor-pointer"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="hero-right hidden lg:block pt-8 lg:pt-20 w-full lg:w-[50%] min-h-[370px] lg:h-auto mr-3 mt-3 relative lg:rounded-r-[20px]">
        <div className="flex flex-row justify-between w-[240px] h-24 px-[5px] py-[6px] bg-white rounded-2xl ml-4 lg:ml-20 shadow-lg btn-scale-animation">
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
            />
          </div>
        </div>

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
