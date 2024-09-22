import { db } from "@/Firebase";

import { recruitValidate } from "@/lib/server/utils";

import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

// Add a new registration
export async function POST(request: Request) {
  const formData = await request.json();
  const { recaptcha_token, ...data } = formData;
  const { email, whatsapp_number, college_id } = formData;

  // Only one Registration per person
  
 // Query for email
const emailQuery = query(
  collection(db, "recruitment2024"),
  where("email", "==", email)
);

// Query for phone number
const phoneQuery = query(
  collection(db, "recruitment2024"),
  where("whatsapp_number", "==", whatsapp_number)
);

// Query for college ID
const collegeIdQuery = query(
  collection(db, "recruitment2024"),
  where("college_id", "==", college_id)
);

// Fetch results from all queries
const [emailSnapshot, phoneSnapshot, collegeIdSnapshot] = await Promise.all([
  getDocs(emailQuery),
  getDocs(phoneQuery),
  getDocs(collegeIdQuery)
]);


  console.log(!emailSnapshot.empty);

  if (!emailSnapshot.empty) {
    return NextResponse.json(
      {
        message: "Email is already registered!",
        error: "Email is already registered!",
      },

      {
        status: 500,
      }
    );
  }
  if (!phoneSnapshot.empty) {
    return NextResponse.json(
      {
        message: "Whatsapp No. is already registered!",
        error: "Whatsapp No. is already registered!",
      },

      {
        status: 500,
      }
    );
  }
  if (!collegeIdSnapshot.empty) {
    return NextResponse.json(
      {
        message: "College Id is already registered!",
        error: "College Id is already registered!",
      },

      {
        status: 500,
      }
    );
  }

  const recaptchaToken = recaptcha_token;

  const details = {
    event: {
      token: recaptchaToken,
      siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    },
  };


  if (!recaptchaToken) {
    return NextResponse.json(
      {
        message: "reCAPTCHA token not found! Try again",
        error: "reCAPTCHA token not found!",
      },
      {
        status: 500,
      }
    );
  }

  // Verify the reCATPTCHA token

  const recaptchaResponse = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.RECAPTCHA_PROJECT}/assessments?key=${process.env.RECAPTCHA_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify(details),
    }
  );

  const recaptchaResult = await recaptchaResponse.json();
  console.log(recaptchaResult.riskAnalysis.score);
  if (recaptchaResult.riskAnalysis.score < 0.7) {
    return NextResponse.json({
      message: "reCAPTCHA validation failed",
      error: recaptchaResult["error-codes"],
    });
  }

  // Validate the data
  const val = recruitValidate(data);

  if (val.error) {
    return NextResponse.json(
      { message: "Validation error", error: val.error },
      { status: 500 }
    );
  }

  // Save to Firebase

  try {
    const docRef = await addDoc(collection(db, "recruitment2024"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
  // Return a response
  return NextResponse.json({ message: "Registration successful" });
}
