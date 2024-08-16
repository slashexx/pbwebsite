export const metadata = {
  title: "Home",
  description: "Landing page",
};

import Hero from "@/components/hero";
import Domains from "@/components/domains";
import "../css/additional-styles/landing.css";
import Landing from "@/components/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col justify-center items-center py-10 px-5 mb-20">
        <div className="text-4xl font-bold text-center text-gray-200 mb-4">
          Upcoming Events
        </div>
        <Link href="/sihregistration">
          <Image
            src={"/images/sih.png"}
            alt="sih"
            height={400}
            width={1100}
            className="rounded-3xl border-2 border-slate-500"
          />
        </Link>
        <Link href="/sihregistration">
          <button className="btn-sm text-xl text-black bg-green-500 mx-3 rounded-xl mt-10">
            Register for SIH
          </button>
        </Link>
      </div>
      <Domains />
      <Landing />
    </>
  );
}
