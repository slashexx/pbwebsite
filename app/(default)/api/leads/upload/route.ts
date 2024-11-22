import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {  NextResponse } from "next/server";
import { db,  storage} from "@/Firebase";


export async function POST(request: Request) {
    try {
        const storage = getStorage();
        const selectedLead = await request.json();
        const imageRef = ref(storage, `images/${selectedLead.name}`);
        let imageUrl;

        try {
            const imageBlob = await fetch(selectedLead.imageUrl).then((r) => r.blob());
            console.log("Image blob fetched:", imageBlob);
            try {
                await uploadBytes(imageRef, imageBlob);
                console.log("Image uploaded to storage");
                try {
                    imageUrl = await getDownloadURL(imageRef);
                    console.log("Image URL obtained:", imageUrl);
                } catch (error: any) {
                    console.error("Error getting image URL:", error);
                    return NextResponse.json(
                        { error: "An error occurred", details: error.message },
                        { status: 500 }
                    );
                }
            } catch (error: any) {
                console.error("Error uploading image:", error);
                return NextResponse.json(
                    { error: "An error occurred", details: error.message },
                    { status: 500 }
                );
            }
        } catch (error: any) {
            console.error("Error fetching image blob:", error);
            return NextResponse.json(
                { error: "An error occurred", details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ imageUrl: imageUrl }, { status: 201 });
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