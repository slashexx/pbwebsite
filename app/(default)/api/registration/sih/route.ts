import { db } from "@/Firebase";
import { sihValidate } from "@/lib/utils";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

// Add a new registration
export async function POST(request: Request) {
  const formData = await request.json();
  const { recaptcha_token, ...data } = formData;
 
  console.log(formData);
  const { team_info } = data;
  const{team_leader} = team_info;
  const {email } = team_leader;

  // Only one Registration per Email

  const q = query(collection(db, "sih2024"), where("team_info.team_leader.email", "==", email));
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
    return NextResponse.json(
      {
        message: "reCAPTCHA validation failed",
        error: recaptchaResult["error-codes"],
      },
      {
        status: 500,
      }
    );
  }

  // Validate the data
  const val = sihValidate(data);

  if (val.error) {
    return NextResponse.json({ message: "Validation error", error: val.error });
  }

  try {
    // Save to Firebase
    const docRef = await addDoc(collection(db, "sih2024"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred", error });
  }
  // Return a response
  return NextResponse.json({ message: "Registration successful" });
}
