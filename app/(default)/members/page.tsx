"use client"

import React, { useState } from 'react';
import Card from "@/components/ui/Card";
import CollapsibleSection from "@/components/ui/CollapsibleSection";

const cards = [
    { name: 'Alice Smith', domain: 'Software Engineer', company: 'Company A', year: "Alumni" },
    { name: 'Bob Johnson', domain: 'Designer', company: 'Company B', year: "Alumni" },
    { name: 'Charlie Brown', domain: 'Project Manager', company: 'Company C', year: "Alumni" },
    { name: 'Dana White', domain: 'QA Tester', company: 'Company D', year: "1st Year" },
    { name: 'Eve Davis', domain: 'Data Scientist', company: 'Company E', year: "3rd Year" },
    { name: 'Alice Smith', domain: 'Software Engineer', company: 'Company A', year: "Alumni" },
    { name: 'Bob Johnson', domain: 'Designer', company: 'Company B', year: "3rd Year" },
    { name: 'Charlie Brown', domain: 'Project Manager', company: 'Company C', year: "2nd Year" },
    { name: 'Dana White', domain: 'QA Tester', company: 'Company D', year: "1st Year" },
    { name: 'Eve Davis', domain: 'Data Scientist', company: 'Company E', year: "4th Year" },
];

const headings = ["Alumni", "4th Year", "3rd Year", "2nd Year", "1st Year"];

export default function Members() {
    const [openIndex, setOpenIndex] = useState<number>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full space-y-4 mt-24">
            <h1 className="text-center font-bold text-4xl text-white">Our Team</h1>
            <div className="w-full max-w-6xl px-2">
                <div className="space-y-2">
                    {headings.map((heading, index) => (
                        <CollapsibleSection
                            key={index}
                            heading={heading}
                            content={
                                <div className='flex justify-center'>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                                        {cards
                                            .filter(card => card.year === heading)
                                            .map((profile, cardIndex) => (
                                                <Card
                                                    key={cardIndex}
                                                    name={profile.name}
                                                    domain={profile.domain}
                                                    company={profile.company}
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
