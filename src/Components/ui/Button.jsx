// src/components/ui/Button.js
import React from 'react';

export const Button = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "px-4 py-2 rounded font-medium";
  const variantStyles =
    variant === "ghost"
      ? "bg-transparent text-gray-800 hover:bg-gray-100"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
};
