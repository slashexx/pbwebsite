"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, TableProperties } from "lucide-react";
import { auth } from "../../../Firebase"; // Firebase setup
import { onAuthStateChanged } from "firebase/auth";

interface Result {
  rank: number;
  name: string;
  score: number;
  consistency?: number[]; // For Rankings only
}

export default function ResultsTable() {
  const [tab, setTab] = useState<"latest" | "rankings">("latest");
  const [isAdmin, setIsAdmin] = useState(false);
  const [latestResults, setLatestResults] = useState<Result[]>([]);
  const [rankings, setRankings] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the hustle data using the GET API endpoint
        const response = await fetch("/api/hustle");
        const data = await response.json();

        if (response.ok && data?.data) {
          const allDocs = data.data;

          // Map the data to the required structure
          const latestData: Result[] = allDocs.latest.results || [];
          const rankingsData: Result[] = allDocs.leaderboard.rankings || [];

          setLatestResults(latestData);
          setRankings(rankingsData);
        } else {
          console.error("Error in response:", data.error);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch results:", error);
        setLoading(false);
      }
    };

    const checkAdmin = async (uid: string) => {
      try {
        const response = await fetch(`/api/admin?uid=${uid}`);
        const { isAdmin } = await response.json();
        setIsAdmin(isAdmin);
        setIsAdminLoggedIn(true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setIsAdminLoggedIn(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAdmin(user.uid);
      } else {
        setIsAdmin(false);
        setIsAdminLoggedIn(false);
      }
    });

    fetchData();

    return () => unsubscribe();
  }, []);

  const handleGetResults = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/scraper/route");
      if (res.ok) {
        alert("Scraper executed successfully!");
        // Optionally, refresh the data here
      } else {
        alert("Failed to update results.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error triggering scraper:", error);
      setLoading(false);
    }
  };

  // Render consistency with ticks and crosses
  const renderConsistency = (consistency?: number[]) => {
    if (!consistency) return "N/A";

    return consistency.map((value, index) => (
      <span
        key={index}
        className="mx-1"
        style={{ color: value === 1 ? "#00C853" : "red" }}
      >
        {value === 1 ? "✓" : "✗"}
      </span>
    ));
  };

  const renderTable = (data: Result[], showConsistency: boolean) => (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Score</th>
            {showConsistency && <th className="px-4 py-3">Consistency</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((result, index) => (
            <tr
              key={index}
              className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 transition-colors"
            >
              <td className="px-4 py-3 font-medium whitespace-nowrap text-white">
                {result.rank}
              </td>
              <td className="px-4 py-3">{result.name}</td>
              <td className="px-4 py-3 font-semibold">{result.score}</td>
              {showConsistency && (
                <td className="px-4 py-3 flex items-center">
                  {renderConsistency(result.consistency)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto pt-14">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-[#00C853] flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10" /> PB HUSTLE
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Track latest results and overall rankings
          </p>
        </motion.header>

        {/* Tab Switcher */}
        <div className="flex justify-center space-x-4 mb-6">
          {(["latest", "rankings"] as const).map((tabName) => (
            <button
              key={tabName}
              onClick={() => setTab(tabName)}
              className={`
                px-4 py-2 rounded-full flex items-center gap-2 transition-all
                ${
                  tab === tabName
                    ? "bg-[#00C853] text-black"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
            >
              <TableProperties className="w-5 h-5" />
              {tabName === "latest" ? "Latest Results" : "Rankings"}
            </button>
          ))}
        </div>

        {/* Admin Refresh Button */}
        {isAdmin && isAdminLoggedIn && tab === "latest" && (
          <div className="flex justify-center mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetResults}
              disabled={loading}
              className="
                bg-[#00C853] text-black px-6 py-2 rounded-full 
                flex items-center gap-2 shadow-lg hover:bg-opacity-90
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <RefreshCw className="w-5 h-5" />
              {loading ? "Updating..." : "GET LATEST RESULTS"}
            </motion.button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00C853]"></div>
          </div>
        ) : (
          renderTable(
            tab === "latest" ? latestResults : rankings,
            tab === "rankings"
          )
        )}
      </div>
    </div>
  );
}
