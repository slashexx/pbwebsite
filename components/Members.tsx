"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import { db } from "@/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Member {
    id: string;
    name: string;
    domain: string;
    company?: string;
    year: string;
}

const headings = ["Alumni", "Fourth Year", "Third Year", "Second Year", "First Year"];

export default function Members() {
    // Set default open index to the index of "Alumni"
    const [openIndex, setOpenIndex] = useState<number>(headings.indexOf("Alumni"));
    const [data, setData] = useState<{ [key: string]: Member[] }>({});

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData: { [key: string]: Member[] } = {};

                for (const heading of headings) {
                    const membersCollection = collection(db, "members");
                    const q = query(membersCollection, where("year", "==", heading));
                    const querySnapshot = await getDocs(q);

                    // Collect all documents
                    const allMembers = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...(doc.data() as Omit<Member, 'id'>)
                    })) as Member[];

                    // Remove duplicates based on name, domain, and year
                    const uniqueMembers = Array.from(
                        new Map(
                            allMembers.map(member => [
                                `${member.name}-${member.domain}-${member.year}`,
                                member
                            ])
                        ).values()
                    );

                    // Sort members alphabetically by name
                    const sortedMembers = uniqueMembers.sort((a, b) => a.name.localeCompare(b.name));

                    fetchedData[heading] = sortedMembers;
                }

                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-full space-y-4 mt-20 pb-8 bg-black">
            <h1 className="text-center font-bold text-4xl text-white"></h1>
            <div className="w-full max-w-6xl px-2 ">
                <div className="space-y-2">
                    {headings.map((heading, index) => (
                        <CollapsibleSection
                            key={index}
                            heading={heading}
                            content={
                                <div className='flex justify-center'>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                                        {data[heading]?.map((profile, cardIndex) => (
                                            <Card
                                                key={cardIndex}
                                                name={profile.name}
                                                domain={profile.domain}
                                                company={profile.company || ""}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
