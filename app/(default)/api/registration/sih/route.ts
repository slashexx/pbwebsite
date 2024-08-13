import { db } from '@/Firebase';
import { sihValidate } from '@/lib/utils';
import { addDoc, collection } from 'firebase/firestore';
import { NextResponse } from 'next/server';  

export async function POST(request: Request) {  
    const data = await request.json();  
    
    const val = sihValidate(data);

    if(val.error){
        return NextResponse.json({ message: 'Validation error', error: val.error });
    }
    
    try{
        // Save to Firebase
        const docRef = await addDoc(collection(db, "sih2024"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred', error });
    }
    // Return a response  
    return NextResponse.json({ message: 'Registration successful', data });  
}  

export async function GET() {  
    // Handle GET requests  
    return NextResponse.json({ message: 'GET request received' });  
}