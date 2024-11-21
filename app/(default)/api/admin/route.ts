import { db } from "@/Firebase";
import {
    doc,
  getDoc,
} from "firebase/firestore";
import {  NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get("uid");
        if (!uid) {
            return NextResponse.json(
                { error: "UID is required" },
                { status: 400 }
            );
        }
        const adminDocRef = doc(db, "admin", uid);
        const adminDocSnap = await getDoc(adminDocRef);
        if (!adminDocSnap.exists()) {
            return NextResponse.json(
                { error: "User is not an admin" , isAdmin: false },
                { status: 403 } 
            );
        }
        else {
            return NextResponse.json(
                { message: "User is an admin" , isAdmin: true },
                { status: 200 } 
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
