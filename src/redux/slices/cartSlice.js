import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const calculateTotals = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
  state.totalCount = state.items.reduce((sum, obj) => (sum += obj.count), 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const foundItem = state.items.find((item, _) => item.id === action.payload.id);

      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      calculateTotals(state);
    },
    decrementCartItem: (state, action) => {
      const foundItem = state.items.find((item, _) => item.id === action.payload);

      if (foundItem && foundItem.count > 1) {
        foundItem.count--;
      } else {
        state.items = state.items.filter((item, _) => item.id !== foundItem.id);
      }

      calculateTotals(state);
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((item, _) => item.id !== action.payload);

      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      calculateTotals(state);
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj, _) => obj.id === id);

export const { addCartItem, decrementCartItem, removeCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
