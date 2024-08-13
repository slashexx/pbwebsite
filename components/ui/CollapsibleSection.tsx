import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CollapsibleSectionProps {
    heading: string;
    content: JSX.Element;
    isOpen: boolean;
    onToggle: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ heading, content, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-700">
            <div
                onClick={(e) => {
                    e.preventDefault();  // Prevent default scrolling behavior
                    onToggle();
                }}
                tabIndex={-1}  // Prevent focus scrolling
                className="flex items-center justify-between p-4 cursor-pointer bg-black text-white"
            >
                <h2 className={`text-xl ${isOpen ? 'text-4xl font-bold' : 'text-xl'} text-green-600`}>
                    {heading}
                </h2>

                {isOpen ? (
                    <FaChevronUp className="h-5 w-5 text-white" />
                ) : (
                    <FaChevronDown className="h-5 w-5 text-white" />
                )}
            </div>
            {isOpen && (
                <div className="p-4 bg-black">
                    {content}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;
