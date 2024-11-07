import Image from "next/image";
import React from "react";
import { PinContainer } from "./creditcards/credits";

// Function to generate the viewport meta tag (optional)
export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
});

export default function PinPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Page heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mt-14 mb-6">
        Website Contributors
      </h1>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[10px]">
        {/* Pin item */}
        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/skysingh04?">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            {/* Image wrapper */}
            <div className="relative h-full w-full">
              <Image
                src="/images/Akash.jpg" // Ensure the image is placed in `public/images`
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              {/* Overlay description */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Akash Singh
                </h3>
                <p className="text-base text-slate-300 mt-2">
                Supervision, Deployment
                </p>
              </div>
            </div>
          </div>
        </PinContainer>

        {/* Repeat for more pins */}
        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/2004-agarwal-yash/">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Yash.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Yash Agrawal
                </h3>
                <p className="text-base text-slate-300 mt-2">
                  Made backend and frontend of leads page
                </p>
              </div>
            </div>
          </div>
        </PinContainer>

        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/alfiyafatima09/">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Allfiya.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Alfiya Fatima
                </h3>
                <p className="text-base text-slate-300 mt-2">
                Authentication, Pbctf registration form, Updates about latest event.
                </p>
              </div>
            </div>
          </div>
        </PinContainer>
        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/naman-parlecha/">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Naman p.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Naman Parlecha
                </h3>
                <p className="text-base text-slate-300 mt-2">
                 Made the entire frontend and Backend of events page.
                </p>
              </div>
            </div>
          </div>
        </PinContainer>
        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/mohit-nagaraj/">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Mohit n.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Mohit Nagaraj
                </h3>
                <p className="text-base text-slate-300 mt-2">
                Streamlined SIH Registration API for efficienton boarding.
                </p>
              </div>
            </div>
          </div>
        </PinContainer>
        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/soumya713/">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Soumya p.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Soumya Pattnayak
                </h3>
                <p className="text-base text-slate-300 mt-2">
                  Supervision.
                </p>
              </div>
            </div>
          </div>
        </PinContainer>
        <PinContainer title="Visit Linkedin" href="linkedin.com/in/suvanbanerjee">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Suvan.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Aceternity UI
                </h3>
                <p className="text-base text-slate-300 mt-2">
                  Landing Page and Boilerplate for seamless setup.
                </p>
              </div>
            </div>
          </div>
        </PinContainer>
        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/tusharmohapatra07">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Tushar.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                Tushar Mohapatra 
                </h3>
                <p className="text-base text-slate-300 mt-2">
                  Made the entire Frontend and Backend of Achievements page.
                </p>
              </div>
            </div>
          </div>
        </PinContainer>
        <PinContainer title="Visit Linkedin" href="https://www.linkedin.com/in/atharv-verma/">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] relative bg-gray-900 rounded-md">
            <div className="relative h-full w-full">
              <Image
                src="/images/Atharv v.jpg"
                alt="Description Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-left bg-gradient-to-t from-black/60 to-transparent z-10">
                <h3 className="font-bold text-base text-slate-100">
                  Atharv Verma
                </h3>
                <p className="text-base text-slate-300 mt-2">
                  Updated Landing Page Ui.
                </p>
              </div>
            </div>
          </div>
        </PinContainer>
      </div>
    </div>
  );
}
