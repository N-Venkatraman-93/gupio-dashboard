import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { toggleFavourite } from '../favourites/favouriteSlice'; // ✅ Import favourite action
import CategoryFilter from '../../components/CategoryFilter';
import SearchBar from '../../components/SearchBar';
import SortDropdown from '../../components/SortDropdown';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Filter by search + category
  let filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category ? product.category === category : true)
  );

  // ✅ Sort by price
  if (sortOrder === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-4">
      <SearchBar onSearch={setSearchTerm} />
      <CategoryFilter selectedCategory={category} onSelect={setCategory} />
      <SortDropdown value={sortOrder} onChange={setSortOrder} />

      {status === 'loading' && <p className="text-center">Loading...</p>}
      {status === 'failed' && (
        <p className="text-center text-red-500">Failed to load products</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain mb-4"
            />
            <h2 className="text-md font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500">${product.price}</p>

            {/* ✅ Favourite Button */}
            <button
              onClick={() => dispatch(toggleFavourite(product))}
              className="mt-2 px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              ❤️ Favourite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
