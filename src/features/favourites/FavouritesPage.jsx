// src/features/favourites/FavouritesPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from './favouriteSlice';
import BackButton from '../../components/BackButton';

const FavouritesPage = () => {
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourites.items);

  return (
    <div className="p-4">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">❤️ Favourites</h2>

      {favouriteItems.length === 0 ? (
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">No favourites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favouriteItems.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md rounded-lg p-4">
              <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain mb-4" />
              <h2 className="text-md font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">${product.price}</p>
              <button
                onClick={() => dispatch(toggleFavourite(product))}
                className="mt-2 px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
