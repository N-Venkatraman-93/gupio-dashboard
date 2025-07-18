import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full p-2 border rounded mb-4"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
