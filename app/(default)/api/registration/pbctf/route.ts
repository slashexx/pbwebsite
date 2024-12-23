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

//Check if USN exists
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usn = searchParams.get("usn");
    if (!usn) {
      return NextResponse.json({ error: "usn is required" }, { status: 400 });
    }
    const q = query(
      collection(db, "pbctf_registrations"),
      where("participant1.usn", "==", usn)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return NextResponse.json(
        { message: "usn not registered", isUnique: true },
        { status: 200 }
      );
    }
    const q2 = query(
      collection(db, "pbctf_registrations"),
      where("participant2.usn", "==", usn)
    );
    const querySnapshot2 = await getDocs(q2);

    if (!querySnapshot2.empty) {
      return NextResponse.json(
        { message: "usn not unique", isUnique: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "usn already exists", isUnique: false },
        { status: 403 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      return NextResponse.json(
        { error: "An error occurred", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}


export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // Extract query parameters
    const action = searchParams.get("action"); // Determine the action from query params

    if (action === "validateRecaptcha") {
      return validateRecaptcha(request);
    } else if (action === "addRegistration") {
      return addRegistration(request);
    } else {
      return NextResponse.json(
        { error: "Invalid action specified" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred", details: error },
      { status: 500 }
    );
  }
}

// Add a new registration
async function validateRecaptcha(request: Request) {
  const formData = await request.json();
  const { recaptcha_token, ...data } = formData;


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
  if (recaptchaResult.riskAnalysis.score < 0.7) {
    return NextResponse.json({
      message: "reCAPTCHA validation failed",
      error: recaptchaResult["error-codes"],
    });
  }

  // Validate registration data

  //Paticipant type
  if (!data.participationType || !["solo", "duo"].includes(data.participationType)) {
    return NextResponse.json({
      message: "Invalid participation type!",
      error: "Invalid participation type!",
    }, { status: 400 });
  }

  //Participant 1
  if (!data.participant1 || !data.participant1.name) {
    return NextResponse.json({
      message: "Participant 1's name is required.",
      error: "Participant 1's name is required.",
    }, { status: 400 });
  }

  if (!data.participant1.year || !["1", "2", "3", "4"].includes(data.participant1.year)) {
    return NextResponse.json({
      message: "Participant 1's year is required.",
      error: "Participant 1's year is required.",
    }, { status: 400 });
  }

  if (!data.participant1.branch) {
    return NextResponse.json({
      message: "Participant 1's branch is required.",
      error: "Participant 1's branch is required.",
    }, { status: 400 });
  }

  const usnPattern1 = data.participant1.year === "1"
    ? /^[1-9][0-9][A-Z]{4}[0-9]{4}$/
    : /^1DS[1-3][0-9][A-Z]{2}[0-9]{3}$/;

  if (!data.participant1.usn || !usnPattern1.test(data.participant1.usn)) {
    return NextResponse.json({
      message: "Participant 1's USN is invalid.",
      error: "Invalid USN for Participant 1.",
    }, { status: 400 });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.participant1.email || !emailPattern.test(data.participant1.email)) {
    return NextResponse.json({
      message: "Participant 1's email is invalid.",
      error: "Invalid email for Participant 1.",
    }, { status: 400 });
  }

  const phonePattern = /^[6-9]\d{9}$/;
  if (!data.participant1.phone || !phonePattern.test(data.participant1.phone)) {
    return NextResponse.json({
      message: "Participant 1's phone number is invalid.",
      error: "Invalid phone number for Participant 1.",
    }, { status: 400 });
  }

  //Participant 2 If Duo
  if (data.participationType === "duo") {
    if (!data.participant2 || !data.participant2.name) {
      return NextResponse.json({
        message: "Participant 2's name is required.",
        error: "Participant 2's name is required.",
      }, { status: 400 });
    }

    if (!data.participant2.year || !["1", "2", "3", "4"].includes(data.participant2.year)) {
      return NextResponse.json({
        message: "Participant 2's year is required.",
        error: "Participant 2's year is required.",
      }, { status: 400 });
    }

    if (!data.participant2.branch) {
      return NextResponse.json({
        message: "Participant 2's branch is required.",
        error: "Participant 2's branch is required.",
      }, { status: 400 });
    }

    const usnPattern2 = data.participant2.year === "1"
      ? /^[1-9][0-9][A-Z]{4}[0-9]{4}$/
      : /^1DS[1-3][0-9][A-Z]{2}[0-9]{3}$/;

    if (!data.participant2.usn || !usnPattern2.test(data.participant2.usn)) {
      return NextResponse.json({
        message: "Participant 2's USN is invalid.",
        error: "Invalid USN for Participant 2.",
      }, { status: 400 });
    }

    if (!data.participant2.email || !emailPattern.test(data.participant2.email)) {
      return NextResponse.json({
        message: "Participant 2's email is invalid.",
        error: "Invalid email for Participant 2.",
      }, { status: 400 });
    }

    if (!data.participant2.phone || !phonePattern.test(data.participant2.phone)) {
      return NextResponse.json({
        message: "Participant 2's phone number is invalid.",
        error: "Invalid phone number for Participant 2.",
      }, { status: 400 });
    }
  }

  // Check if USNs are the same for duo participation
  if (
    data.participationType === "duo" &&
    data.participant2 &&
    data.participant1.usn === data.participant2.usn
  ) {
    return NextResponse.json({
      message: "USNs for Participant 1 and Participant 2 cannot be the same",
      error: "USNs for Participant 1 and Participant 2 cannot be the same",
    }, { status: 400 });
  }

  // Check USN uniqueness for participant1
  const isUnique1 = await checkUsnUniqueness(data.participant1.usn);
  if (!isUnique1) {
    return NextResponse.json({
      message: "Participant 1's USN already exists.",
      error: "Participant 1's USN already exists.",
    }, { status: 400 });
  }

  // Check USN uniqueness for participant2 if it exists
  if (data.participationType === "duo" && data.participant2) {
    const isUnique2 = await checkUsnUniqueness(data.participant2.usn);
    if (!isUnique2) {
      return NextResponse.json({
        message: "Participant 2's USN already exists.",
        error: "Participant 2's USN already exists.",
      }, { status: 400 });
    }
  }
  try {
    // Save to Firebase
    await addDoc(collection(db, "pbctf_registrations"), data);
    return NextResponse.json({ message: "Registration successful"});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}

async function addRegistration(request: Request) {
  try {
    const data = await request.json();
    if (!data || !data.participant1 || !data.participationType) {
      return NextResponse.json(
        {
          error:
            "Invalid data. Participant1 and participationType are required.",
        },
        { status: 400 }
      );
    }
    await addDoc(collection(db, "pbctf_registrations"), data);

    return NextResponse.json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error adding registration:", error);
    return NextResponse.json(
      { error: "Failed to add registration.", details: error },
      { status: 500 }
    );
  }
}
