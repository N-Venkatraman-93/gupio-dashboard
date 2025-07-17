import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './features/products/ProductList';
import FavouritesPage from './features/favourites/FavouritesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
