import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const favouriteCount = useSelector((state) => state.favourites.items.length);

  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🛍️ Gupio Store</Link>
      <div className="space-x-6 relative flex items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <div className="relative">
          <Link to="/favourites" className="hover:underline">
            ❤️ Favourites
          </Link>
          {favouriteCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {favouriteCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
