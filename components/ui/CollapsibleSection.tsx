import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CollapsibleSectionProps {
    heading: string;
    content: JSX.Element;
    isOpen: boolean;
    onToggle: () => void;
}

const CollapsibleSection = forwardRef<HTMLDivElement, CollapsibleSectionProps>(
    ({ heading, content, isOpen, onToggle }, ref) => {
        const localRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => localRef.current!);

        useEffect(() => {
            if (isOpen && localRef.current) {

                const offset = 200; // Adjust this value to match the height of your navbar
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = localRef.current.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });

            }
        }, [isOpen]);


        return (
            <div className="border-b border-gray-700" ref={localRef}>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        onToggle();
                    }}
                    tabIndex={-1}
                    className="flex items-center justify-between p-4 cursor-pointer bg-black text-white"
                >
                    <h2 className={`${isOpen ? 'text-4xl font-bold' : 'text-xl'} text-[#00C853]`}>
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
    }
);

CollapsibleSection.displayName = 'CollapsibleSection';

export default CollapsibleSection;