import { NextResponse } from 'next/server';
import { db } from '@/Firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!Array.isArray(data)) {
            return NextResponse.json({ message: 'Expected an array of JSON objects', error: true });
        }

        const savedData = [];
        for (const item of data) {
            // Save each item to Firebase Firestore
            const docRef = await addDoc(collection(db, "members"), item);
            console.log("Document written with ID: ", docRef.id);

            // Collect saved data for response
            savedData.push({ id: docRef.id, ...item });
        }

        // Return a success response
        return NextResponse.json({ message: 'Registration successful', data: savedData });
    } catch (error) {
        console.error('An error occurred:', error);
        return NextResponse.json({ message: 'An error occurred', error });
    }
}