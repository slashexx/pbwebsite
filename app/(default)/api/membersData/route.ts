import { NextResponse } from "next/server";
import { db, storage } from "@/Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import connectMongoDB from "@/lib/dbConnect";
import Membersmodel from "@/models/Members";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";

// GET handler to retrieve all members
export async function GET() {
  await connectMongoDB()
  try {
    const querySnapshot = await Membersmodel.find()
    const members = querySnapshot.map((member: any) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      company: member.company || "",
      year: member.year,
      linkedInUrl: member.linkedInUrl || "",
      imageUrl: member.imageUrl || "",
    }));

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

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, year, role, company, imageUrl, linkedInUrl } = data;

    if (!name) {
      return NextResponse.json(
        { message: "Missing Name.", error: true },
        { status: 400 }
      );
    }


    // Add the new member document to the Firestore collection

    const newMember=new Membersmodel({
      ...data,
    }) 
    const savedMember = await newMember.save()
    

    // Return success response with the new member's document ID
    return NextResponse.json(
      { message: "Member added successfully",savedMember},
      { status: 201 }
    );
  } catch (error) {
    // Catch and log any errors during member creation
    console.error("Error adding member:", error);
    return NextResponse.json(
      { message: `Failed to add member: ${error}`, error: true },
      { status: 500 }
    );
  }
}

// PUT handler to update an existing member
export async function PUT(request: Request) {
  await connectMongoDB();

  try {
    const data = await request.json();
    const { id, name, imageUrl } = data;
    const newid:Object=new ObjectId(id);
    // Validate required fields
    if (!id || !name) {
      return NextResponse.json(
        { message: "Missing required fields: 'id' and 'name' are mandatory.", error: true },
        { status: 400 }
      );
    }

    // Update the member in the database
    const updatedData = await Membersmodel.findOneAndUpdate(
      { _id:newid }, 
      { ...data }, 
      { new: true } 
    );

    // Check if the member was found and updated
    if (!updatedData) {
      return NextResponse.json(
        { message: `No member found with ID: ${id}`, error: true },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Member updated successfully", data: updatedData },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { message: `Failed to update member: ${(error as Error).message}`, error: true },
      { status: 500 }
    );
  }
}


// DELETE handler to delete a member and their image
export async function DELETE(request: Request) {
  try {
    // Parse the request body to get the member ID
    const { id } = await request.json();
    const newid:Object=new ObjectId(id);
    // Check if the member ID is provided
    if (!id) {
      return NextResponse.json(
        { message: "Missing member ID", error: true },
        { status: 400 }
      );
    }

    const memberSnapshot = await Membersmodel.findOne({_id:newid})
    // If the member does not exist, return a 404 response
    if (!memberSnapshot) {
      return NextResponse.json(
        { message: "Member not found", error: true },
        { status: 404 }
      );
    }

    const memberData = memberSnapshot
    const imageUrl = memberData.imageUrl;

    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch((error) => {
        console.error("Error deleting image from Firebase Storage:", error);
        return NextResponse.json(
          { message: "Failed to delete image from storage", error: true },
          { status: 500 }
        );
      });
    }
    await Membersmodel.deleteOne({_id:newid});
    return NextResponse.json(
      { message: "Member and associated image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { message: "Failed to delete member", error },
      { status: 500 }
    );
  }
}
