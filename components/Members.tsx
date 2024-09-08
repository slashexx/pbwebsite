"use client";

import React, { useState, useEffect, useRef } from 'react';
import Card from "./ui/Card";
import CollapsibleSection from './ui/CollapsibleSection';
import ClipLoader from "react-spinners/ClipLoader";
import { FaRegBell, FaEllipsisV } from 'react-icons/fa';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase";
import { db } from "@/Firebase";
import { collection, getDocs } from "firebase/firestore";

interface Member {
    id?: string;
    name: string;
    domain: string;
    company?: string;
    year: string;
}

const headings = ["Alumni", "Fourth Year", "Third Year", "Second Year", "First Year"];

export default function Members() {
    const [openIndex, setOpenIndex] = useState<number>(headings.indexOf("Alumni"));
    const [data, setData] = useState<{ [key: string]: Member[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editMemberId, setEditMemberId] = useState<string | null>(null);
    const [newMember, setNewMember] = useState<Member>({
        name: '',
        domain: '',
        company: '',
        year: ''
    });
    const [menuVisible, setMenuVisible] = useState<{ [key: string]: boolean }>({});
    const formRef = useRef<HTMLDivElement>(null); // Reference to the form container

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                //get user uuid
                const uid = user.uid;
                //check if uuid present in firestore
                //if present then set isAdmin to true
                const querySnapshot = await getDocs(collection(db, "admin"));
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid === uid) {
                        setIsAdmin(true);
                    }
                });
            }
        });
    });


    const handleAddOrEditMember = async () => {
        if (!newMember.name || !newMember.domain || !newMember.year) {
            alert("Please fill in all required fields (Name, Domain/Role, and Year).");
            return;
        }

        try {
            const method = isEditing ? 'PUT' : 'POST';
            const memberData = isEditing ? { ...newMember, id: editMemberId } : newMember;

            const response = await fetch('/api/membersData', {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Network response was not ok.", result);
                throw new Error(result.message || 'Network response was not ok.');
            }

            alert(isEditing ? "Member updated successfully" : "Member added successfully");
            setShowForm(false);
            setIsEditing(false);
            setEditMemberId(null);
            setNewMember({
                name: '',
                domain: '',
                company: '',
                year: ''
            });
            await fetchData();
        } catch (error) {
            console.error("Error adding/updating member:", error);
            alert("An error occurred. Check the console for details.");
        }
    };


    const handleEditMember = (member: Member) => {
        setNewMember(member);
        setIsEditing(true);
        setShowForm(true);
        setEditMemberId(member.id || null);
        // Scroll to the form
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };

    const handleDeleteMember = async (id: string) => {
        try {
            const response = await fetch('/api/membersData', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.json();

            if (result.error) {
                console.error("Error deleting member:", result.message);
                alert(result.message);
            } else {
                alert("Member deleted successfully");
                await fetchData();
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const toggleMenu = (id: string) => {
        setMenuVisible(prev => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/membersData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: Member[] = await response.json();
            const uniqueMembersMap = new Map<string, Member>();

            result.forEach((member: Member) => {
                const key = `${member.name}-${member.domain}-${member.year}`;
                if (!uniqueMembersMap.has(key)) {
                    uniqueMembersMap.set(key, member);
                }
            });

            const uniqueMembers = Array.from(uniqueMembersMap.values()).sort((a, b) => a.name.localeCompare(b.name));
            const fetchedData: { [key: string]: Member[] } = {};

            for (const heading of headings) {
                fetchedData[heading] = uniqueMembers.filter((member: Member) => member.year === heading);
            }

            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full space-y-4 mt-24 bg-black">
            <h1 className="text-center font-bold text-4xl text-white">Point Blank's Team</h1>
            <div className="w-full max-w-6xl px-2">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <ClipLoader color={"#00C853"} loading={loading} size={50} />
                    </div>
                ) : (
                    <div className="space-y-2">
                        {headings.map((heading, index) => (
                            <CollapsibleSection
                                key={index}
                                heading={heading}
                                content={
                                    <div className="flex justify-center">
                                        {heading === "First Year" && (
                                            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex items-center space-x-9 lg:w-7/12 justify-center">
                                                <p className="text-xl font-bold lg:text-2xl text-center">
                                                    Recruitment Incoming Soon!
                                                </p>
                                                <FaRegBell
                                                    className="text-[#00C853] text-2xl"
                                                    style={{
                                                        animation: "ring 0.5s ease-in-out infinite",
                                                        transformOrigin: "center",
                                                    }}
                                                />
                                                <style jsx>{`
                                            @keyframes ring {
                                               0% {
                                             transform: rotate(0deg);
                                              }
                                             25% {
                                            transform: rotate(-15deg);
                                             }
                                             50% {
                                            transform: rotate(0deg);
                                             }
                                               75% {
                                             transform: rotate(15deg);
                                             }
                                              100% {
                                            transform: rotate(0deg);
                                               }
                                             }
                                            `}</style>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                                            {data[heading]?.map((profile, cardIndex) => (
                                                <div key={cardIndex} className="relative">
                                                    <Card
                                                        name={profile.name}
                                                        domain={profile.domain}
                                                        company={profile.company || ""}
                                                    />
                                                    <div className="absolute top-2 right-2">
                                                        {isAdmin ? (
                                                            <button
                                                                onClick={() => toggleMenu(profile.id || '')}
                                                                className="bg-gray-800 text-white p-2 rounded-full"
                                                            >
                                                                <FaEllipsisV />
                                                            </button>
                                                        ) : null
                                                        }

                                                        {menuVisible[profile.id || ''] && (
                                                            <div className="absolute right-0 mt-2 bg-black text-white border rounded-md shadow-lg">
                                                                <button
                                                                    onClick={() => handleEditMember(profile)}
                                                                    className="block w-full px-4 py-2 hover:bg-gray-900"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteMember(profile.id || '')}
                                                                    className="block px-4 py-2 text-red-700 hover:bg-gray-900"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                isOpen={openIndex === index}
                                onToggle={() => handleToggle(index)}
                            />
                        ))}
                    </div>
                )}

                {isAdmin ? (
                    <div className="flex justify-center mt-8">
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                            onClick={() => {
                                setShowForm(prev => {
                                    const newShowForm = !prev;
                                    // Scroll to the form if it's being shown
                                    if (newShowForm) {
                                        formRef.current?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                    return newShowForm;
                                });
                            }}
                        >
                            {showForm ? 'Close Form' : 'Add Member'}
                        </button>
                    </div>
                ) : null
                }

                {showForm && (
                    <div
                        ref={formRef}
                        className="mt-6 p-6 w-full mx-auto rounded-lg shadow-lg flex flex-col justify-center items-center"
                        style={{ backgroundColor: 'black' }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-10 text-center">
                            {isEditing ? "Edit Member" : "Add New Member"}
                        </h2>
                        <form className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                            <label className="block text-white mb-10">
                                Name<span className='text-red-500'>*</span>
                                <input
                                    type="text"
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                    className="block w-72 md:w-96 mt-1 p-2 rounded bg-black border-b border-white text-white focus:border-green-600 focus:outline-none"
                                />
                            </label>
                            <label className="block text-white mb-10">
                                Domain/Role<span className='text-red-500'>*</span>
                                <input
                                    type="text"
                                    value={newMember.domain}
                                    onChange={(e) => setNewMember({ ...newMember, domain: e.target.value })}
                                    className="block w-72 md:w-96 mt-1 p-2 rounded bg-black border-b border-white text-white focus:border-green-600 focus:outline-none"
                                />
                            </label>
                            <label className="block text-white mb-10">
                                Company (optional):
                                <input
                                    type="text"
                                    value={newMember.company || ''}
                                    onChange={(e) => setNewMember({ ...newMember, company: e.target.value })}
                                    className="block w-72 md:w-96 mt-1 p-2 rounded bg-black border-b border-white text-white focus:border-green-600 focus:outline-none"
                                />
                            </label>
                            <label className="block text-white mb-6">
                                Year<span className='text-red-500'>*</span>
                                <select
                                    value={newMember.year}
                                    onChange={(e) => setNewMember({ ...newMember, year: e.target.value })}
                                    className="block w-72 md:w-96 mt-1 p-2 rounded bg-black border-b border-white text-white focus:border-green-600 focus:outline-none"
                                >
                                    <option value="">Select Year</option>
                                    {headings.map((heading, idx) => (
                                        <option key={idx} value={heading}>{heading}</option>
                                    ))}
                                </select>
                            </label>
                            <button
                                type="button"
                                onClick={handleAddOrEditMember}
                                className="px-4 py-2 bg-green-600 text-white rounded-md mt-4 mx-auto"
                            >
                                {isEditing ? "Update Member" : "Add Member"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}