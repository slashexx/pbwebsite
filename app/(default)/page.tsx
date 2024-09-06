export const metadata = {
  title: "Home",
  description: "Landing page",
};

import Hero from "@/components/hero";
import Domains from "@/components/domains";
import "../css/additional-styles/landing.css";
import Activities from "@/components/activities";
import Image from "next/image";
import Link from "next/link";
import SparklesText from "@/components/magicui/sparkles-text";
import EventComponent from "@/components/eventcards";
import Leads from "@/components/leads";
import Achievements from '@/components/achievements';
import Founder from "@/components/founder";
import Announce from "@/components/announcement";


export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col justify-center items-center py-10 px-5 mb-20">
        <SparklesText text="Upcoming Events" className="text-4xl font-bold text-center text-gray-200 mb-4" /> 
        <Link href="/sihregistration">
          <Image
            src={"/images/announce.png"}
            alt="sih"
            height={400}
            width={1100}
            className="rounded-3xl mt-20"
          />
        </Link>
        <div className="flex md:flex-row flex-col justify-center items-center py-10 px-5">
        <Link href="/sihregistration">
          <button className="btn-sm px-5 py-3 text-xl font-bold text-white bg-green-600 mx-3 rounded-xl mt-10">
            Register for SIH
          </button>
        </Link>
        {/* Add a download button  */}
        <a href="/Shortlisted.pdf" download>
          <button className="btn-sm px-5 py-3 text-xl font-bold text-white bg-green-600 mx-3 rounded-xl mt-10">
            Download Shortlisted Problem Statements
          </button>
        </a>
        </div>
        <Announce />
      </div>
      <Domains />
      <Activities />
      <Founder />
      <Leads />
      <Achievements/>
      <EventComponent />
    </>
  );
}
