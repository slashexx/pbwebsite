import React, { useState } from "react";

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
        className="w-full text-white py-2 px-4 rounded-md focus:outline-none form-input bg-transparent focus:border-none focus:outline-offset-0 focus:outline-green-500 flex justify-between"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span className="h-4 w-4">
          {!isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#ffffff"
                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
              />
            </svg>
          ) : (
            ""
          )}
        </span>
      </button>
      {isOpen && <div className="mt-2 p-4">{children}</div>}
    </div>
  );
};

export default Accordion;
