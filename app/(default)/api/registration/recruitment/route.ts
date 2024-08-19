import { db } from "@/Firebase";
import { recruitValidate } from "@/lib/utils";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// Verify reCAPTCHA Token
async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey || "",
        response: token,
      }),
    }
  );
  const data = await response.json();
  return data.success;
}

// Add a new registration
export async function POST(request: Request) {
  const data = await request.json();
  const recaptchaToken = data.recaptchaToken; // Extract the reCAPTCHA token from the request

  // Verify the reCAPTCHA token
  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);

  if (!isRecaptchaValid) {
    return NextResponse.json({
      message: "reCAPTCHA verification failed",
      error: true,
    });
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
    return NextResponse.json({ message: "Validation error", error: val.error });
  }

  try {
    // Save to Firebase
    const docRef = await addDoc(collection(db, "recruitment2024"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred", error });
  }
  // Return a response
  return NextResponse.json({ message: "Registration successful", data });
}

// Get all registrations
export async function GET() {
  try {
    // Get all registrations in recruitment2024 collection
    const querySnapshot = await getDocs(collection(db, "recruitment2024"));
    // Map the data to get only the data
    const data = querySnapshot.docs.map((doc) => doc.data());
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred", error });
  }
}
