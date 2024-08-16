"use client";

import { useEffect, useState } from "react";

interface Achiever {
  imageUrl: string;
  Email: string;
  Name: string;
  Batch: number;
  Portfolio: string;
  Internship: string;
  CompanyPosition: string;
  Stipend: number;
  achievements: string[];
}

function AchievementCard({ achiever }: { achiever: Achiever }) {
  return (
    <div className="bg-[hsla(0,0%,100%,.079)] rounded-xl shadow-lg overflow-hidden w-[330px]">
      <div className="overflow-hidden">
        <img
          src={achiever.imageUrl}
          alt={`${achiever.Name}'s profile`}
          className="w-full h-[300px] object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h3 className="text-center text-2xl font-semibold mb-2 capitalize-first-letter">
          {achiever.Name}
        </h3>
        <ul className="list-disc list-outside pl-5">
          {achiever?.CompanyPosition ? (
            <li className="text-gray-600 text-lg mb-2">
              {" "}
              {achiever.CompanyPosition}
            </li>
          ) : null}
          {achiever.achievements.map((achievement, index) => (
            <li key={index} className="text-gray-600 text-lg mb-2">
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  const [achievers, setAchievers] = useState<Achiever[]>([]);

  useEffect(() => {
    async function fetchAchievers() {
      try {
        const response = await fetch("/api/achievements");
        const data = await response.json();
        setAchievers(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    }

    fetchAchievers();
  }, []);

  return (
    <div className="container w-full mx-auto pt-32">
      <h1 className="text-center text-4xl font-bold mb-28">Achievements</h1>
      <div className="grid grid-cols-1 2gl:grid-cols-2 3gl:grid-cols-3 gap-x-5 gap-y-5 max-w-[1030px] mx-auto justify-items-center">
        {[...Array(3)].map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-y-5">
            {achievers
              .filter((_, index) => index % 3 === colIndex)
              .map((achiever) => (
                <AchievementCard key={achiever.Email} achiever={achiever} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
