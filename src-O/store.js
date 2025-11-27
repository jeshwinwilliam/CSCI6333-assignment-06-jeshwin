
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import todoReducer from './features/todos/todoSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    todos: todoReducer,
  },
});

export default store;
