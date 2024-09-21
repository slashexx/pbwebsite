import { db } from "@/Firebase";
import {
  createCSRFToken,
  getSessionIdFromRequest,
  verifyCSRFToken,
} from "@/lib/server/csrf";
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
  const { email } = formData;

  // Only one Registration per Email

  const q = query(
    collection(db, "recruitment2024"),
    where("email", "==", email)
  );
  const querySnapshot = await getDocs(q);

  console.log(!querySnapshot.empty);

  if (!querySnapshot.empty) {
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

  const recaptchaToken = recaptcha_token;
  if (!recaptchaToken) {
    return NextResponse.json(
      {
        message: "reCAPTCHA token not found! Refresh and try again",
        error: "reCAPTCHA token not found!",
      },
      {
        status: 500,
      }
    );
  }
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Verify reCAPTCHA token
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const recaptchaResult = await recaptchaResponse.json();

  console.log(recaptchaResult);
  if (!recaptchaResult.success) {
     return NextResponse.json({
      message: "reCAPTCHA verification failed",
      error: true,
    });
  }
  const sessionId = getSessionIdFromRequest(request);
  const csrfToken = createCSRFToken(sessionId);

  // Verify the CSRF token
  if (!verifyCSRFToken(sessionId, csrfToken)) {
    return NextResponse.json(
      { message: "Invalid CSRF token" },
      {
        status: 403,
      }
    );
  }

  // Validate the data
  const val = recruitValidate(data);

  if (!Array.isArray(data)) {
    return NextResponse.json({
      message: "Expected an array of JSON objects",
      error: true,
    });
  }

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
