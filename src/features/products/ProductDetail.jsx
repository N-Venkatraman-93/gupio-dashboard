// src/features/products/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { toggleFavourite } from '../favourites/favouriteSlice';
import { addToCart } from '../cart/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const favourites = useSelector((state) => state.favourites.items);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = items.find((p) => p.id === Number(id));
  const isFavourite = favourites.some((f) => f.id === product?.id);

  if (!product || status === 'loading') return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex gap-6 flex-col md:flex-row">
        <img src={product.image} alt={product.title} className="w-60 object-contain" />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 my-2">{product.description}</p>
          <p className="text-lg font-semibold text-blue-600">${product.price}</p>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="border px-2 py-1 rounded w-24 mt-2"
          />

          <div className="mt-4 flex gap-4">
            <button
              onClick={() => dispatch(toggleFavourite(product))}
              className={`px-4 py-2 rounded ${
                isFavourite ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'
              }`}
            >
              {isFavourite ? '❤️ Remove Favourite' : '🤍 Add to Favourite'}
            </button>

            <button
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
