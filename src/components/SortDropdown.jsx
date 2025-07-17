// src/components/SortDropdown.jsx
import React from 'react';

const SortDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded mb-4 w-full"
    >
      <option value="">Sort by Price</option>
      <option value="low">Low to High</option>
      <option value="high">High to Low</option>
    </select>
  );
};

export default SortDropdown;
