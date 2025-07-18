// src/features/products/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { toggleFavourite } from '../favourites/favouriteSlice';
import { addToCart, removeFromCart } from '../cart/cartSlice';
import SortDropdown from '../../components/SortDropdown';
import CustomSearchBar from '../../components/CustomSearchBar';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const favourites = useSelector((state) => state.favourites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const allCategories = [...new Set(items.map((product) => product.category))];

  let filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(product.category))
  );

  if (sortOrder === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  return (
    <div className="p-4">
      {/* 🔍 Search & Filter */}
      <CustomSearchBar
        onSearch={({ query, selected }) => {
          setSearchTerm(query);
          setSelectedCategories(selected);
        }}
        allCategories={allCategories}
      />

      {/* 🔃 Sort Dropdown */}
      <SortDropdown value={sortOrder} onChange={setSortOrder} />

      {/* 💬 Status */}
      {status === 'loading' && <p className="text-center">Loading...</p>}
      {status === 'failed' && <p className="text-center text-red-500">Failed to load products</p>}
      {filteredProducts.length === 0 && status === 'succeeded' && (
        <p className="text-center text-gray-600 dark:text-gray-300">No products found.</p>
      )}

      {/* 🛍 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => {
          const isFavourite = favourites.some((fav) => fav.id === product.id);
          const isInCart = cartItems.some((cartItem) => cartItem.id === product.id);
          const quantity = quantities[product.id] || 1;

          return (
            <div key={product.id} className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md rounded-lg p-4 flex flex-col justify-between">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 mx-auto object-contain mb-4"
                />
                <h2 className="text-md font-semibold hover:underline">{product.title}</h2>
              </Link>

              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">${product.price}</p>

              <div className="flex items-center gap-2 mb-2">
                <label htmlFor={`qty-${product.id}`} className="text-sm">Qty:</label>
                <input
                  type="number"
                  id={`qty-${product.id}`}
                  value={quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="w-16 px-2 py-1 border rounded dark:bg-gray-700"
                />
              </div>

              <div className="flex gap-2 mt-auto">
                {/* ❤️ Favourite */}
                <button
                  onClick={() => dispatch(toggleFavourite(product))}
                  className={`px-3 py-1 text-sm rounded ${isFavourite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                >
                  {isFavourite ? '❤️ Remove' : '🤍 Favourite'}
                </button>

                {/* 🛒 Cart Button */}
                {isInCart ? (
                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                  >
                    ❌ Remove
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(addToCart({ ...product, quantity }))}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    🛒 Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
