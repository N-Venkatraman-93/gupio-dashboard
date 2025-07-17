// src/features/products/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { toggleFavourite } from '../favourites/favouriteSlice';
import { addToCart } from '../cart/cartSlice';
import SortDropdown from '../../components/SortDropdown';
import { Link } from 'react-router-dom';
import CustomSearchBar from '../../components/CustomSearchBar';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const favourites = useSelector((state) => state.favourites.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const allCategories = [...new Set(items.map((product) => product.category))];

  const filteredProducts = items.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category))
  );

  if (sortOrder === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: parseInt(value) }));
  };

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <CustomSearchBar
        onSearch={({ query, selected }) => {
          setSearchTerm(query);
          setSelectedCategories(selected);
        }}
        allCategories={allCategories}
      />
      <SortDropdown value={sortOrder} onChange={setSortOrder} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => {
          const isFavourite = favourites.some((fav) => fav.id === product.id);
          const qty = quantities[product.id] || 1;

          return (
            <div key={product.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain mb-4" />
                <h2 className="text-md font-semibold hover:underline text-gray-800 dark:text-white">{product.title}</h2>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">${product.price}</p>

              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                className="w-full border px-2 py-1 mb-2"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(toggleFavourite(product))}
                  className={`flex-1 px-3 py-1 text-sm rounded ${
                    isFavourite
                      ? 'bg-red-500 text-white'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  {isFavourite ? '❤️ Remove' : '🤍 Favourite'}
                </button>
                <button
                  onClick={() => dispatch(addToCart({ ...product, quantity: qty }))}
                  className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  🛒 Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
