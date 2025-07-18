import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import favouriteReducer from '../features/favourites/favouriteSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    favourites: favouriteReducer,
    cart: cartReducer,
  },
});
