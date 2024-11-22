import { db } from "@/Firebase";
import {
    getDocs,
    collection,
    updateDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore";
import {  NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function GET(request: Request) {
    try {
        const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
    const data = eventSnapshot.docs.map((doc) => doc.data());
    const eventsList = data.map((event : any) => {
        return {
          id: event.id,
          eventName: event.eventName,
          description: event.description,
          eventDate: event.eventDate,
          lastDateOfRegistration: event.lastDateOfRegistration,
          dateCreated: event.dateCreated,
          dateModified: event.dateModified,
          imageURL: event.imageURL,
          registrationLink: event.registrationLink,
        };
      });
        return NextResponse.json({ events: eventsList }, { status: 200 });
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
        const newEvent = await request.json();
    const eventId = uuidv4();

        const currentDate = new Date().toISOString();
        const { eventName, eventDate, lastDateOfRegistration, description, imageURL, registrationLink } = newEvent;
        await setDoc( doc(db , "events" , eventId), {
            id : eventId,
            eventName,
            eventDate,
            lastDateOfRegistration,
            description,
            imageURL,
            registrationLink,
            dateCreated: currentDate,
            dateModified: currentDate,
          });
        return NextResponse.json({ id: eventId }, { status: 201 });
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

export async function PUT(request: Request) {
    try{
        const { searchParams } = new URL(request.url);
        const eventid = searchParams.get("eventid");
        if (!eventid) {
            return NextResponse.json(
                { error: "Event ID is required" },
                { status: 400 }
            );
        }
        const updatedEvent = await request.json();
      await updateDoc(doc(db, "events", eventid), updatedEvent);
        return NextResponse.json({ id: eventid }, { status: 200 });

    }catch (error) {
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

export async function DELETE(request: Request) {
    try{
        const { searchParams } = new URL(request.url);
        const eventid = searchParams.get("eventid");
        if (!eventid) {
            return NextResponse.json(
                { error: "Event ID is required" },
                { status: 400 }
            );
        }
    await deleteDoc(doc(db, "events", eventid));
    }
    catch (error) {
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




