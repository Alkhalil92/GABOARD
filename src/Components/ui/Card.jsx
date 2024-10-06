// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg p-4">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-4 border-b pb-2">{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-bold ${className}`}>{children}</h3>
);

export const CardContent = ({ children }) => (
  <div>{children}</div>
);
