// src/components/CategoryFilter.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryFilter = ({ selectedCategory, onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => {
        setCategories(res.data);
      });
  }, []);

  return (
    <select
      value={selectedCategory}
      onChange={(e) => onSelect(e.target.value)}
      className="p-2 border rounded mb-4 w-full"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
