import { NextResponse } from 'next/server';
import { db, storage } from '@/Firebase';
import {
    collection, addDoc, getDocs, DocumentData,
    DocumentSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';


export async function GET() {
    try {

        const querySnapshot = await getDocs(collection(db, "pbMembers"));

        const membersRaw = querySnapshot.docs.map(
            (doc: DocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data(),
            })
        );

        const members = membersRaw.map((member: any) => {
            return {
                id: member.id,
                name: member.name,
                role: member.role,
                company: member.company || '',
                year: member.year,
                linkedInUrl: member.linkedInUrl || '',
                imageUrl: member.imageUrl || ''
            };
        });

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
                { message: 'Missing Name.', error: true },
                { status: 400 }
            );
        }

        let downloadURL = '';
        if (imageUrl) {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                return NextResponse.json(
                    { message: 'Failed to fetch image from the URL.', error: true },
                    { status: 400 }
                );
            }
            const contentType = response.headers.get('content-type');

            if (!contentType || !contentType.startsWith('image/')) {
                return NextResponse.json(
                    { message: 'The provided URL is not a valid image.', error: true },
                    { status: 400 }
                );
            }

            const blob = await response.blob();

            const extension = contentType.split('/')[1];

            const imageRef = ref(storage, `member/${name}.${extension}`);
            await uploadBytes(imageRef, blob, { contentType });

            downloadURL = await getDownloadURL(imageRef);
        }

        const docRef = await addDoc(collection(db, 'pbMembers'), {
            name,
            year,
            role,
            company,
            linkedInUrl,
            imageUrl: downloadURL,
        });

        return NextResponse.json(
            { message: 'Member added successfully', id: docRef.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding member:', error);
        return NextResponse.json(
            { message: `Failed to add member: ${error}`, error: true },
            { status: 500 }
        );
    }
}


export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, name, year, role, company, imageUrl, linkedInUrl } = data;

        if (!id || !name) {
            return NextResponse.json(
                { message: 'Missing required fields or member ID', error: true },
                { status: 400 }
            );
        }

        const memberRef = doc(db, "pbMembers", id);
        const memberSnapshot = await getDoc(memberRef);
        if (!memberSnapshot.exists()) {
            return NextResponse.json(
                { message: 'Member not found', error: true },
                { status: 404 }
            );
        }

        const memberData = memberSnapshot.data();
        let downloadURL = memberData.imageUrl;

        if (imageUrl && imageUrl !== memberData.imageUrl) {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                return NextResponse.json(
                    { message: 'Failed to fetch image from the URL.', error: true },
                    { status: 400 }
                );
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.startsWith('image/')) {
                return NextResponse.json(
                    { message: 'The provided URL is not a valid image.', error: true },
                    { status: 400 }
                );
            }

            const blob = await response.blob();
            const extension = contentType.split('/')[1];

            // Use a timestamp to ensure a unique filename
            const timestamp = Date.now();
            const imageRef = ref(storage, `member/${name}_${timestamp}.${extension}`);

            await uploadBytes(imageRef, blob, { contentType });
            downloadURL = await getDownloadURL(imageRef);

            if (memberData.imageUrl) {
                const oldImageRef = ref(storage, memberData.imageUrl);
                await deleteObject(oldImageRef).catch(error => {
                    console.error('Error deleting old image:', error);
                });
            }
        }

        const updatedData = {
            name,
            year,
            role,
            company,
            linkedInUrl,
            imageUrl: downloadURL,
        };

        await updateDoc(memberRef, updatedData);

        return NextResponse.json(
            { message: 'Member updated successfully', data: updatedData },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating member:', error);
        return NextResponse.json(
            { message: `Failed to update member: ${error}`, error: true },
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

        // Reference to the member document
        const memberRef = doc(db, 'pbMembers', id);
        const memberSnapshot = await getDoc(memberRef);

        if (!memberSnapshot.exists()) {
            return NextResponse.json(
                { message: 'Member not found', error: true },
                { status: 404 }
            );
        }

        const memberData = memberSnapshot.data();
        const imageUrl = memberData.imageUrl;

        // Delete the image from Firebase Storage if it exists
        if (imageUrl) {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef).catch((error) => {
                console.error('Error deleting image from Firebase Storage:', error);
                return NextResponse.json(
                    { message: 'Failed to delete image from storage', error: true },
                    { status: 500 }
                );
            });
        }

        // Delete the member document from Firestore
        await deleteDoc(memberRef);

        return NextResponse.json(
            { message: 'Member and associated image deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting member:', error);
        return NextResponse.json(
            { message: 'Failed to delete member', error },
            { status: 500 }
        );
    }
}



// // Posting a array of members

// export async function POST(request: Request) {
//     try {
//         const data = await request.json();

//         if (!Array.isArray(data)) {
//             return NextResponse.json({ error: 'Invalid data format. Expected an array of objects.' }, { status: 400 });
//         }

//         for (const item of data) {
//             const { name, year, role, company, imageUrl, linkedInUrl } = item;

//             if (!name) {
//                 return NextResponse.json({ error: 'Missing Name.' }, { status: 400 });
//             }

//             let downloadURL = '';
//             if (imageUrl) {
//                 const response = await fetch(imageUrl);

//                 if (!response.ok) {
//                     return NextResponse.json({ error: 'Failed to fetch image from the URL.' }, { status: 400 });
//                 }

//                 const contentType = response.headers.get('content-type');

//                 if (!contentType || contentType.includes('text/html')) {
//                     return NextResponse.json({ error: 'Provided link is not a direct image link. Please ensure the Google Drive file is public.' }, { status: 400 });
//                 }

//                 const blob = await response.blob();
//                 const extension = contentType.split('/')[1];

//                 const imageRef = ref(storage, `try/${name}.${extension}`);
//                 await uploadBytes(imageRef, blob, { contentType });

//                 downloadURL = await getDownloadURL(imageRef); // Assign value to downloadURL
//             }

//             await addDoc(collection(db, 'tryMembers'), {
//                 name,
//                 year,
//                 role,
//                 company,
//                 linkedInUrl,
//                 imageUrl: downloadURL || '',
//             });
//         }

//         return NextResponse.json({ message: 'Data added successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error uploading data:', error);
//         return NextResponse.json({ error: `Failed to add data: ${error}` }, { status: 500 });
//     }
// }
