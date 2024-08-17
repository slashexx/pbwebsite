"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Achiever {
  imageUrl?: string;
  image?: File;
  email: string;
  name: string;
  batch: number;
  portfolio: string;
  internship: string;
  companyPosition: string;
  achievements: string[];
}

function AchievementCard({ achiever }: { achiever: Achiever }) {
  return (
    <div className="bg-[hsla(0,0%,100%,.079)] rounded-xl shadow-lg overflow-hidden w-[330px]">
      <div className="overflow-hidden">
        <img
          src={achiever.imageUrl}
          alt={`${achiever.name}'s profile`}
          className="w-full h-[300px] object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h3 className="text-center text-2xl font-semibold mb-2 capitalize-first-letter">
          {achiever.name}
        </h3>
        <ul className="list-disc list-outside pl-5">
          {achiever?.companyPosition && (
            <li className="text-gray-600 text-lg mb-2">
              {achiever.companyPosition}
            </li>
          )}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Partial<Achiever>>({
    achievements: [""],
  });

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

  const handleAddAchievement = () => {
    setNewAchievement((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), ""],
    }));
  };

  const handleChangeAchievement = (index: number, value: string) => {
    const updatedAchievements = [...(newAchievement.achievements || [])];
    updatedAchievements[index] = value;
    setNewAchievement((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("image", newAchievement.image || "");
      formData.append("email", newAchievement.email || "");
      formData.append("name", newAchievement.name || "");
      formData.append("batch", String(newAchievement.batch || ""));
      formData.append("portfolio", newAchievement.portfolio || "");
      formData.append("internship", newAchievement.internship || "");
      formData.append("companyPosition", newAchievement.companyPosition || "");
      formData.append("achievements", JSON.stringify(newAchievement.achievements || []));
      const response = await axios.post("/api/achievements", formData);
      setAchievers((prev) => [...prev, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="container w-full mx-auto pt-32">
      <h1 className="text-center text-4xl font-bold mb-8">Achievements</h1>
      <div className="grid grid-cols-1 2gl:grid-cols-2 3gl:grid-cols-3 gap-x-5 gap-y-5 max-w-[1030px] mx-auto justify-items-center">
        {[...Array(3)].map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-y-5">
            {achievers
              .filter((_, index) => index % 3 === colIndex)
              .map((achiever) => (
                <AchievementCard key={achiever.email} achiever={achiever} />
              ))}
          </div>
        ))}
      </div>
      <div className="text-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black py-2 px-4 rounded shadow-lg"
        >
          Add Achievements
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-black text-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Add Achievement</h2>
            <form
              className="space-y-6 overflow-y-auto max-h-[80vh]"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={newAchievement.email || ""}
                  onChange={(e) =>
                    setNewAchievement((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full p-3 bg-gray-800 rounded"
                  placeholder="Add Email"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newAchievement.name || ""}
                  onChange={(e) =>
                    setNewAchievement((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full p-3 bg-gray-800 rounded"
                  placeholder="Add Name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Batch:</label>
                <input
                  type="number"
                  name="batch"
                  id="batch"
                  value={newAchievement.batch || ""}
                  onChange={(e) =>
                    setNewAchievement((prev) => ({
                      ...prev,
                      batch: Number(e.target.value),
                    }))
                  }
                  className="w-full p-3 bg-gray-800 rounded"
                  placeholder="Add Year"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Portfolio:</label>
                <input
                  type="text"
                  name="portfolio"
                  id="portfolio"
                  value={newAchievement.portfolio || ""}
                  onChange={(e) =>
                    setNewAchievement((prev) => ({
                      ...prev,
                      portfolio: e.target.value,
                    }))
                  }
                  className="w-full p-3 bg-gray-800 rounded"
                  placeholder="Add GitHub Link"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Doing internship or have done in past:
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="internship"
                      value="Yes"
                      checked={newAchievement.internship === "Yes"}
                      onChange={(e) =>
                        setNewAchievement((prev) => ({
                          ...prev,
                          internship: e.target.value,
                        }))
                      }
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="internship"
                      value="No"
                      checked={newAchievement.internship === "No"}
                      onChange={(e) =>
                        setNewAchievement((prev) => ({
                          ...prev,
                          internship: e.target.value,
                        }))
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Company & Position:</label>
                <input
                  type="text"
                  name="companyPosition"
                  id="companyPosition"
                  value={newAchievement.companyPosition || ""}
                  onChange={(e) =>
                    setNewAchievement((prev) => ({
                      ...prev,
                      companyPosition: e.target.value,
                    }))
                  }
                  className="w-full p-3 bg-gray-800 rounded"
                  placeholder="Position, Company"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Select an image of the person:
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewAchievement((prev) => ({
                        ...prev,
                        image: file,
                        imageUrl: URL.createObjectURL(file),
                      }));
                    }
                  }}
                  className="w-full p-3 bg-gray-800 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Achievements:</label>
                {newAchievement.achievements?.map((achievement, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      name="achievements"
                      value={achievement}
                      onChange={(e) =>
                        handleChangeAchievement(index, e.target.value)
                      }
                      className="w-full p-3 bg-gray-800 rounded"
                      placeholder="Add an achievement"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Add More
                </button>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
