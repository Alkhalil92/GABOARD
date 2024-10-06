// src/components/ui/Checkbox.jsx
import React from 'react';

export const Checkbox = ({ id, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onCheckedChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {id}
      </label>
    </div>
  );
};
