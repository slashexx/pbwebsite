import { db } from "@/Firebase";
import { recruitValidate } from "@/lib/utils";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// Verify reCAPTCHA Token

// Add a new registration
export async function POST(request: Request) {
  const formData = await request.json();
  const { recaptcha_token, ...data } = formData;
  const recaptchaToken = recaptcha_token;
  if (!recaptchaToken) {
    throw new Error("Token not found!");
  }
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Verify reCAPTCHA token
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const recaptchaResult = await recaptchaResponse.json();
  console.log(data);
  console.log(recaptchaResult);
  if (!recaptchaResult.success) {
    return NextResponse.json({
      message: "reCAPTCHA validation failed",
      error: recaptchaResult["error-codes"],
    });
  }

  // Validate the data
  const val = recruitValidate(data);

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
