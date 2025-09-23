import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
});

export default store;
