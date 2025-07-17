import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from './favouriteSlice';

const FavouritesPage = () => {
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourites.items);

  if (favouriteItems.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
        No favourites added yet.
      </p>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">❤️ Favourites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favouriteItems.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain mb-4"
            />
            <h2 className="text-md font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">${product.price}</p>
            <button
              onClick={() => dispatch(toggleFavourite(product))}
              className="mt-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-700 text-red-600 dark:text-white rounded hover:bg-red-200 dark:hover:bg-red-600"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
