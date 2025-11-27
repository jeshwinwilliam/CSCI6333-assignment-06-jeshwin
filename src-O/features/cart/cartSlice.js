
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  taxRate: 0.08,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    incrementItem(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity++;
    },
    decrementItem(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartSummary = (state) => {
  const itemCount = state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * state.cart.taxRate;
  const total = subtotal + tax;
  return { itemCount, subtotal, tax, total };
};

export default cartSlice.reducer;
