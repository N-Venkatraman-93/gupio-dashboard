import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import favouriteReducer from '../features/favourites/favouriteSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    favourites: favouriteReducer,
  },
});
