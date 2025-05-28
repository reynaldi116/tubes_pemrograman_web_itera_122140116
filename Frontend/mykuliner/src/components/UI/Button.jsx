import React from 'react';
const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;