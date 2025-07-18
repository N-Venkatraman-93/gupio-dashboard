import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const favCount = useSelector((state) => state.favourites.items.length);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white dark:text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">🏠 Home</Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/favourites" className="relative hover:underline transition">
            ❤️ Favourites
            {favCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {favCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative hover:underline transition">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleDarkMode}
            className="bg-white dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded transition duration-300"
          >
            🌙 Toggle Dark
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none transition-transform"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 animate-slide-down">
          <Link to="/favourites" className="block hover:underline relative">
            ❤️ Favourites
            {favCount > 0 && (
              <span className="absolute top-0 left-28 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {favCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="block hover:underline relative">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute top-0 left-20 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleDarkMode}
            className="bg-white dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded transition duration-300"
          >
            🌙 Toggle Dark
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
