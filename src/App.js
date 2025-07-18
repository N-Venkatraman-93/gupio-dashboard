import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './features/products/ProductList';
import FavouritesPage from './features/favourites/FavouritesPage';
import ProductDetail from './features/products/ProductDetail';
import CartPage from './features/cart/CartPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;