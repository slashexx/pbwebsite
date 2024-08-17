import { db, storage } from "@/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract data from the form
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const batch = formData.get("batch") as string;
    const portfolio = formData.get("portfolio") as string;
    const internship = formData.get("internship") as string;
    const companyPosition = formData.get("companyPosition") as string;
    const achievements = JSON.parse(
      formData.get("achievements") as string
    ) as string[];
    const image = formData.get("image") as File;

    // Check if a person with the same name already exists
    const existingMembersQuery = query(
      collection(db, "achievements"),
      where("Name", "==", name)
    );
    const querySnapshot = await getDocs(existingMembersQuery);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: `A member with the name ${name} already exists.` },
        { status: 400 }
      );
    }

    // Handle image upload
    if (!image) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);

    // Save data to Firestore without Timestamp
    const docRef = await addDoc(collection(db, "achievements"), {
      Name: name,
      Email: email,
      Batch: batch,
      Portfolio: portfolio,
      Internship: internship,
      CompanyPosition: companyPosition,
      achievements: achievements,
      imageUrl: imageUrl,
    });
    return NextResponse.json({
      id: docRef.id,
      imageUrl: imageUrl,
      name,
      email,
      batch,
      portfolio,
      internship,
      companyPosition,
      achievements,
    });
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

export async function GET() {
  try {
    // Fetch all documents from the "achievements" collection
    const querySnapshot = await getDocs(collection(db, "achievements"));

    // Map through the documents and extract the data
    const membersRaw = querySnapshot.docs.map(
      (doc: DocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
    const members = membersRaw.map((member: any) => {
      return {
        id: member.id,
        name: member.Name,
        email: member.Email,
        batch: member.Batch,
        portfolio: member.Portfolio,
        internship: member.Internship,
        companyPosition: member.CompanyPosition,
        achievements: member.achievements,
        imageUrl: member.imageUrl,
      };
    });
    // Return the members data
    return NextResponse.json(members);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching members:", error.message);
      return NextResponse.json(
        {
          error: "An error occurred while fetching members",
          details: error.message,
        },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred while fetching members" },
        { status: 500 }
      );
    }
  }
}
