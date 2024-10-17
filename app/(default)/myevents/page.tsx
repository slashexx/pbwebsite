"use client";

import React, { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import cls from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
const MyEventCard = ({
  event,
  onClick,
}: {
  event: Event;
  onClick: (event: Event) => void;
}) => {
  return (
    <div
      onClick={() => onClick(event)}
      className={`max-w-sm bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg m-4 transform hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer`}
    >
      <div className="p-2">
        <Image
          src="https://img.freepik.com/premium-vector/trendy-event-banner-template_85212-590.jpg"
          alt="Event"
          width={500}
          height={300}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>

      <div className="px-4">
        <div className="flex justify-between mb-4 items-center pt-2">
          <div className="flex flex-col items-center bg-gray-800 border border-white text-white px-3 py-2 h-fit w-fit rounded-xl">
            <span className="text-sm font-bold">
              {event.general_dates?.start.toLocaleDateString("en-US", {
                day: "numeric",
              })}
            </span>
            <span className="text-xs text-gray-200">
              {event.general_dates?.start.toLocaleDateString("en-US", {
                month: "short",
              })}
            </span>
          </div>

          <div className="ml-4 flex-1">
            <h2 className="text-xl font-semibold">{event.event_name}</h2>
          </div>
        </div>
        <p className="text-gray-300 text-sm pb-4">
          {event.event_description[0]}
        </p>
      </div>
    </div>
  );
};

export const Sidebar = ({
  event,
  onClose,
}: {
  event: Event | null;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (event) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [event]);

  return (
    event && (
      <div
        className={`fixed top-0 right-0 bg-gray-800 ${
          cls.noscrollbar
        } text-white h-full overflow-auto shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-full md:w-1/2 lg:w-1/3`}
      >
        <div className="p-4">
          <button
            onClick={() => {
              setIsOpen(false);
              setTimeout(onClose, 300); // Delay the onClose to allow the animation to finish
            }}
            className="text-white bg-gray-700 rounded-xl mb-4"
          >
            <CircleX />
          </button>

          <div className="p-2">
            <Image
              src="https://img.freepik.com/premium-vector/trendy-event-banner-template_85212-590.jpg"
              alt="Event"
              layout="responsive"
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col px-2 pt-2 gap-2">
            <h2 className="text-xl font-semibold">{event.event_name}</h2>
            <div className="w-full flex flex-wrap items-center gap-2">
              <div className="rounded-full w-8 h-8 bg-white">
                {/* add a point blank logo here */}
              </div>
              <p>Host By {event.host_name}</p>
            </div>
            {event.general_dates && (
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex flex-col w-fit h-fit rounded-[0.5rem] overflow-hidden border-gray-600 bg-gray-700">
                  <p className="bg-gray-700 px-2 font-semibold text-center text-sm">
                    {event.general_dates?.start.toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </p>
                  <p className="text-center bg-gray-900">
                    {event.general_dates?.start.toLocaleDateString("en-US", {
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>
                    {event.general_dates?.start.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    {event.general_dates?.start.toLocaleTimeString("en-US")} -{" "}
                    {event.general_dates?.end.toLocaleTimeString("en-US")}
                  </p>
                </div>
              </div>
            )}
            {(event.first_year_dates || event.second_year_dates) && (
              <p className="font-semibold text-md w-full border-b pb-1 border-white/20">
                Dates
              </p>
            )}
            {event.first_year_dates && (
              <div className="flex flex-wrap gap-2 items-center">
                <p className="font-semibold text-md w-full">First Year</p>
                <div className="flex flex-col w-fit h-fit rounded-[0.5rem] overflow-hidden border-gray-600 bg-gray-700">
                  <p className="bg-gray-700 px-2 font-semibold text-center text-sm">
                    {event.first_year_dates?.start.toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </p>
                  <p className="text-center bg-gray-900">
                    {event.first_year_dates?.start.toLocaleDateString("en-US", {
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>
                    {event.first_year_dates?.start.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    {event.first_year_dates?.start.toLocaleTimeString("en-US")}{" "}
                    - {event.first_year_dates?.end.toLocaleTimeString("en-US")}
                  </p>
                </div>
              </div>
            )}
            {event.second_year_dates && (
              <div className="flex flex-wrap gap-2 items-center">
                <p className="font-semibold text-md w-full">
                  Second &amp; Third Year
                </p>
                <div className="flex flex-col w-fit h-fit rounded-[0.5rem] overflow-hidden border-gray-600 bg-gray-700">
                  <p className="bg-gray-700 px-2 font-semibold text-center text-sm">
                    {event.second_year_dates?.start.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                      }
                    )}
                  </p>
                  <p className="text-center bg-gray-900">
                    {event.second_year_dates?.start.toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="flex flex-col">
                  <p>
                    {event.second_year_dates?.start.toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    {event.second_year_dates?.start.toLocaleTimeString("en-US")}{" "}
                    - {event.second_year_dates?.end.toLocaleTimeString("en-US")}
                  </p>
                </div>
              </div>
            )}
            <div className="w-full flex flex-col bg-gray-700 rounded-[0.5rem] border-2 border-gray-700 overflow-hidden mt-2">
              <h3 className="font-semibold text-sm p-2">Registration</h3>
              <div className="w-full flex flex-col bg-black/50 p-4 gap-2">
                <p>Welcome! To join the event, please register below.</p>
                <Link
                  className="w-full bg-white text-black py-2 font-semibold rounded-[0.5rem] text-center"
                  href={event.registration_link}
                >
                  Register
                </Link>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mb-4">
              <div>
                <p>{event.event_description}</p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <p className="font-semibold text-md w-full border-b pb-1 border-white/20">
                Important Links
              </p>
              <div className="flex flex-col gap-2">
                {event.important_links.map((link, index) => (
                  <div className="flex gap-2 flex-wrap">
                    <p className="text-sm font-medium">{link.name} : </p>
                    <Link
                      className="text-green-400 flex-1 break-words"
                      href={link.link}
                    >
                      {link.link}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

interface Event {
  bannerImageLink: string;
  event_name: string;
  host_name: string;
  first_year_dates?: {
    start: Date;
    end: Date;
  };
  second_year_dates?: {
    start: Date;
    end: Date;
  };
  general_dates?: {
    start: Date;
    end: Date;
  };
  registration_link: string;
  event_description: string;
  important_links: {
    name: string;
    link: string;
  }[];
  createdAt: Date;
}

const eventzz: Event[] = [
  {
    bannerImageLink:
      "https://img.freepik.com/premium-vector/business-conference-banner-template_85212-590.jpg",
    event_name: "Startup Pitch Competition",
    host_name: "InnovateX",
    first_year_dates: {
      start: new Date("2023-12-10T13:00:00"),
      end: new Date("2023-12-10T18:00:00"),
    },
    second_year_dates: {
      start: new Date("2023-12-11T10:00:00"),
      end: new Date("2023-12-11T17:00:00"),
    },
    general_dates: {
      start: new Date("2023-12-10T13:00:00"),
      end: new Date("2023-12-10T18:00:00"),
    },
    registration_link: "https://example.com/register/startup-pitch-competition",
    event_description:
      "The Startup Pitch Competition offers a platform for startups to showcase their innovative ideas to investors and industry leaders.",
    important_links: [
      {
        name: "Event Guidelines",
        link: "https://innovatex.com/guidelines",
      },
      {
        name: "Register Here",
        link: "https://innovatex.com/register",
      },
    ],
    createdAt: new Date(),
  },
];

const Page = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const today = new Date();

  const isUpcoming = (event: Event) =>
    event.general_dates && event.general_dates.start > today;

  const isOngoing = (event: Event) =>
    event.general_dates &&
    event.general_dates.start <= today &&
    event.general_dates.end >= today;

  const isPast = (event: Event) =>
    event.general_dates &&
    event.general_dates.end &&
    event.general_dates.end < today;

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseSidebar = () => {
    setSelectedEvent(null);
  };

  const upcomingEvents = eventzz.filter(isUpcoming);
  const ongoingEvents = eventzz.filter(isOngoing);
  const pastEvents = eventzz.filter(isPast);

  return (
    <div className="mt-16 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Events</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="flex flex-wrap gap-4 sm:justify-center md:justify-center lg:justify-start">
            {upcomingEvents.map((event, index) => (
              <MyEventCard
                key={index}
                event={event}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <p className="w-full text-center">No upcoming events.</p>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Ongoing Events</h2>
        {ongoingEvents.length > 0 ? (
          <div className="flex flex-wrap gap-4 sm:justify-center md:justify-center lg:justify-start">
            {ongoingEvents.map((event, index) => (
              <MyEventCard
                key={index}
                event={event}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <p className="w-full text-center">No ongoing events.</p>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
        {pastEvents.length > 0 ? (
          <div className="flex flex-wrap gap-4 sm:justify-center md:justify-center lg:justify-start">
            {pastEvents.map((event, index) => (
              <MyEventCard
                key={index}
                event={event}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <p className="w-full text-center">No past events.</p>
        )}
      </div>

      <Sidebar event={selectedEvent} onClose={handleCloseSidebar} />

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleCloseSidebar}
        />
      )}
    </div>
  );
};

export default Page;
