import { NextResponse } from 'next/server';
import { db } from '@/Firebase';
import {
    collection, addDoc, getDocs, DocumentData,
    DocumentSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersRaw = querySnapshot.docs.map(
            (doc: DocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data(),
            })
        );

        const members = membersRaw.map((member: any) => ({
            id: member.id,
            name: member.name,
            domain: member.domain,
            company: member.company || '',
            year: member.year,
        }));

        return NextResponse.json(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        return NextResponse.json(
            {
                error: "An error occurred while fetching members",
                details: error,
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.name || !data.domain || !data.year) {
            return NextResponse.json(
                { message: 'Missing required fields', error: true },
                { status: 400 }
            );
        }

        const docRef = await addDoc(collection(db, "members"), data);
        console.log("Document written with ID: ", docRef.id);

        return NextResponse.json(
            { message: 'Member added successfully', data },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding member:', error);
        return NextResponse.json(
            { message: 'Failed to add member', error: error },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updatedData } = data;

        if (!id || !updatedData.name || !updatedData.domain || !updatedData.year) {
            return NextResponse.json(
                { message: 'Missing required fields or member ID', error: true },
                { status: 400 }
            );
        }

        const memberRef = doc(db, "members", id); // Use the document ID
        await updateDoc(memberRef, updatedData);

        return NextResponse.json(
            { message: 'Member updated successfully', data: updatedData },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating member:', error);
        return NextResponse.json(
            { message: 'Failed to update member', error },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { message: 'Missing member ID', error: true },
                { status: 400 }
            );
        }

        await deleteDoc(doc(db, 'members', id));
        return NextResponse.json({ message: 'Member deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting member:', error);
        return NextResponse.json(
            { message: 'Failed to delete member', error: error },
            { status: 500 }
        );
    }
}
