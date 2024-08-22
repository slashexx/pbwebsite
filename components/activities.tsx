import React from "react";
import Image from "next/image";
import HyperText from "@/components/magicui/hyper-text";

export default function Activities() {
  return (
    <>
      <div className="flex flex-col place-items-center font-bold pt-20 pb-10">
        <h2 className="text-5xl text-white-800 text-center mb-0">Activities</h2>
      </div>

      {/* CP Post */}
      <div
        className="flex flex-col md:flex-row w-full h-full"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        <div className="highlight flex-1 flex items-center justify-center bg-black-800 p-8">
          <div className="p-8 md:p-16">
            <HyperText className="text-3xl font-bold mb-4 text-green-500 " text="CP" />
            <h2 className="text-2xl font-bold mb-4 px-0">PB Hustle</h2>
            <p className="text-lg text-justify px-0">  
              Point Blank has organized over 40+ editions of its PB Hustle
              coding contest, where participants solve 5-7 increasingly
              difficult problems in their preferred programming language. The
              contest aims to enhance the programming culture in colleges and
              help teams qualify for the ACM ICPC. Impressively, DSCE's leading
              programmers have risen through this platform, with participation
              in the CodeChef Long Challenge expanding from just 3 to over 70+
              participants.
            </p>
          </div>
        </div>
        <div className=" highlight flex-1 w-full flex items-center justify-center bg-black-900">
          <div className="h-96 w-96 flex items-center justify-center bg-black-900">
            <Image
              src={"/images/cp.jpeg"}
              alt=""
              className="rounded-xl object-cover w-full h-full"
              width={"500"}
              height={"500"}
            />
          </div>
        </div>
      </div>

      {/* Development Post */}
      <div
        className="flex flex-col-reverse items-center justify-center md:flex-row w-full h-full"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        <div className="highlight flex-1 flex items-center justify-center bg-black-500 h-full">
          <div className="h-96 flex items-center justify-center bg-black-900">
            <Image
              src={"/images/dev.jpg"}
              alt=""
              className="rounded-xl object-cover w-full h-full"
              width={"500"}
              height={"500"}
            />
          </div>
        </div>
        <div className="highlight flex-1 flex items-center justify-center p-8 bg-black-800">
          <div className="p-8 md:p-16 text-justify">
            <HyperText
              className="text-3xl font-bold mb-4 text-green-500"
              text="Development"
            />
            <h2 className="text-2xl font-bold mb-4">PB Chronicles</h2>
            <p className="text-lg text-justify">
              Point Blank has hosted over 100+ workshops, covering a wide range
              of topics including open source, DevOps, machine learning,
              placement preparation, data structures and algorithms, and mobile
              and web development, among others. These workshops are typically
              conducted in an informal and unscripted manner, though we do
              document some of our most significant sessions. One notable
              example is our primer on F/OSS development.
            </p>
          </div>
        </div>
      </div>

      {/* Hackathon Post */}
      <div
        className="flex flex-col md:flex-row w-full h-full"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        <div className="highlight flex-1 flex items-center justify-center bg-black-800 p-8">
          <div className="p-8 md:p-16">
            <HyperText
              className="text-3xl font-bold mb-4 text-green-500"
              text="Hackathons"
            />
            <h2 className="text-2xl font-bold mb-4">Smart India Hackathon</h2>
            <p className="text-lg text-justify">
              Each year, we organize the internal round of the Smart India
              Hackathon. In the 2020 edition, over 300+ individuals from DSCE
              participated. Two of our teams advanced to the finals, with one
              emerging as the winner of the software edition. Along with this,
              teams from Point Blank have won hackathons all across the city and
              country.
            </p>
          </div>
        </div>
        <div className="highlight flex-1 flex items-center justify-center bg-black-900">
          <div className="h-96 flex items-center justify-center bg-black-900">
            <Image
              src={"/images/hack.jpg"}
              alt=""
              className="rounded-xl object-cover w-full h-full"
              width={"500"}
              height={"500"}
            />
          </div>
        </div>
      </div>

      {/* CyberSec Post */}
      <div
        className="flex flex-col-reverse items-center justify-center md:flex-row w-full h-full"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        <div className="highlight flex-1 flex items-center justify-center bg-black-900 h-full">
          <div className="w-96 h-96 flex items-center justify-center bg-black-900">
            <Image
              src={"/images/ctf.jpg"}
              alt=""
              className="rounded-xl object-cover w-full h-full"
              width={"300"}
              height={"300"}
            />
          </div>
        </div>

        <div className="highlight flex-1 flex items-center justify-center p-8 bg-black-800">
          <div className="p-8 md:p-16">
            <HyperText
              className="text-3xl font-bold mb-4 text-green-500"
              text="Cybersecurity"
            />
            <h2 className="text-2xl font-bold mb-4">PB CTF</h2>
            <p className="text-lg text-justify">
              We organize workshops and sessions on various topics in
              cybersecurity, including hands-on practice on different platforms.
              In 2023, we launched the first in-house Capture The Flag event,
              PBCTF, which attracted over 70+ participants.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
