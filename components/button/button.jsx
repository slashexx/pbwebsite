import React from 'react';

// Define the Button component
const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}  // this will be undefined if not provided
      className={className}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
