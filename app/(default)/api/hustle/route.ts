import { NextResponse } from "next/server";
import axios from "axios";
import { JSDOM } from "jsdom";
import puppeteer from "puppeteer";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot,
  getDocs,
} from "firebase/firestore";
import { app } from "@/Firebase"; // Ensure this is exported in Firebase.ts

// Type definitions
interface ContestRanking {
  rank: number;
  name: string;
  score: number;
}

interface LeaderboardUser {
  name: string;
  score: number;
  consistency: number;
  rank?: number;
}

interface LeaderboardData {
  rankings?: LeaderboardUser[];
  updatedAt?: Date;
}

// Configuration
const API_URL =
  process.env.VJUDGE_CONTEST_API ||
  "https://vjudge.net/contest/data?draw=2&start=0&length=20&sortDir=desc&sortCol=0&category=mine&running=3&title=&owner=yuvraj_coder1&_=1733642420751";

export async function POST() {
  try {
    // Initialize Firestore
    const db = getFirestore(app);

    // Fetch contest code
    const API_URL =
      process.env.VJUDGE_CONTEST_API ||
      "https://vjudge.net/contest/data?draw=2&start=0&length=20&sortDir=desc&sortCol=0&category=mine&running=3&title=&owner=yuvraj_coder1&_=1733642420751";
    // Replace with your API URL
    const { data } = await axios.get(API_URL);
    const ccode = data.data[0][0]; // Assuming this is correct
    console.log("Contest Code:", ccode);

    const url = `https://vjudge.net/contest/${ccode}#rank`;

    // Use Puppeteer to scrape the page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the contest rank URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the table to load
    await page.waitForSelector("#contest-rank-table tbody");

    // Scrape the rankings
    const latest: ContestRanking[] = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll("#contest-rank-table tbody tr")
      );
      return rows.slice(0).map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          rank: parseInt(cells[0]?.textContent?.trim() || "0"),
          name: cells[1]?.textContent?.trim() || "",
          score: parseInt(cells[2]?.textContent?.trim() || "0"),
        };
      });
    });

    console.log("Scraped Rankings:", latest);

    // Close the browser
    await browser.close();

    // Update "latest" contest results
    const latestRef = doc(db, "hustle", "latest");
    await setDoc(latestRef, {
      results: latest,
      updateTime: new Date(),
    });

    // Update overall leaderboard
    const leaderboardRef = doc(db, "hustle", "leaderboard");
    const leaderboardDoc = await getDoc(leaderboardRef);

    // Safely extract existing leaderboard data
    const existingData = leaderboardDoc.data() as LeaderboardData | undefined;
    let rankings: LeaderboardUser[] = existingData?.rankings || [];

    // Aggregate rankings
    latest.forEach(({ name, score }) => {
      const existingUser = rankings.find((user) => user.name === name);
      if (existingUser) {
        existingUser.score += score;
        existingUser.consistency += 1;
      } else {
        rankings.push({ name, score, consistency: 1 });
      }
    });

    // Sort and rank users
    rankings.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.consistency !== a.consistency) return b.consistency - a.consistency;
      return (a.rank || 0) - (b.rank || 0);
    });

    rankings.forEach((user, index) => {
      user.rank = index + 1;
    });

    // Store updated leaderboard
    await setDoc(leaderboardRef, { rankings, updatedAt: new Date() });

    return NextResponse.json({
      message: "Leaderboard updated successfully",
      rankings,
    });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to update leaderboard" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = getFirestore(app);

    // Get a reference to the "hustle" collection
    const hustleCollection = collection(db, "hustle");

    // Fetch documents from the collection
    const querySnapshot = await getDocs(hustleCollection);

    // Process documents
    const allDocs: Record<string, DocumentData> = {};
    querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      allDocs[docSnap.id] = docSnap.data();
    });

    return NextResponse.json({
      message: "Fetched all hustle data successfully",
      data: allDocs,
    });
  } catch (error) {
    console.error("Error fetching hustle data:", error);
    return NextResponse.json(
      { error: "Failed to fetch hustle data" },
      { status: 500 }
    );
  }
}
