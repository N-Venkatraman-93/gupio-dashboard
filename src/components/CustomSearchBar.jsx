import React, { useState, useEffect } from 'react';

const CustomSearchBar = ({ onSearch, allCategories }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);

  const handleCheckboxChange = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    onSearch({ query, selected });
  }, [query, selected]);

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {allCategories.map((cat) => (
          <label key={cat} className="text-sm flex items-center gap-1">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => handleCheckboxChange(cat)}
              className="accent-purple-600"
            />
            {cat}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomSearchBar;
