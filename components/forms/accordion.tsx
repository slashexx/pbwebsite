import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <button
        type="button"
        className="w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-between"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-2 p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;