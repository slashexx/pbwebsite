'use client';

import React from "react";

export default function Announce() {
    const [showDialog, setShowDialog] = React.useState(false);

    const handleToggleDialog = () => {
        setShowDialog(!showDialog);
    }

    const handleCloseDialog = () => {
        setShowDialog(false);
    }

    return (
        <div className="relative mx-auto items-center justify-center">
            <div className="dark:text-white pb-8 mx-auto max-w-fit" data-aos="zoom-y-out" data-aos-delay="150">
                <button onClick={handleToggleDialog} className="text-center text-xl font-extrabold relative underline underline-offset-4 decoration-[#16a34a] decoration-4" data-aos="zoom-y-out" data-aos-delay="150" id="message">
                    Important Announcement: SIH Dates are Postponed to 15th September 2024
                </button>
            </div>
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 dark:text-white p-16 rounded-xl shadow-lg">
                        <h2 className="text-xl md:text-xl font-bold leading-tighter tracking-tighter mb-4">SIH Dates are Postponed to 15th September 2024</h2>
                        <div className="max-h-[80vh] overflow-y-auto">
                            <p className="mb-4">
                                Hey Participants!
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>SIH last date got extended to 20th for uploading the results of the online round</li>
                                <li>each team is now allowed to submit for 2 problem statements (in any category, any combination)</li>
                                <li>now 45+5 teams can be nominated to grand finale</li>
                            </ul>
                            <p className="mb-4">
                                Given that teams barely had any time after their exams, it’s in our best interest to postpone to next Sunday.
                            </p>
                            <p className="mb-4">
                                Use this extra week wisely! We anticipated something like this, so we had planned our Internal round towards the tail end of the registration period.
                            </p>
                            <p className="mb-4">
                                P.S: the rule changes can be seen on the SIH website: <a href="https://www.sih.gov.in/">https://www.sih.gov.in/</a>
                            </p>
                        </div>
                        <button className="mt-4 bg-black dark:bg-white dark:text-black text-white font-bold py-2 px-4 rounded" onClick={handleCloseDialog}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}