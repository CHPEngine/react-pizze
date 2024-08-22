import { createSlice } from '@reduxjs/toolkit';
import calculatePizzaTotals from '../../../utils/calculatePizzaTotals';
import getItemsFromLocalStorage from '../../../utils/getPizzasFromLocalStorage';
import { CartSliceState } from './types';



const { totalCount, totalPrice, items } = getItemsFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  totalCount,
  items,
};

const calculateTotals = (state: CartSliceState) => {
  const { totalPrice, totalCount } = calculatePizzaTotals(state.items);

  state.totalPrice = totalPrice;
  state.totalCount = totalCount;
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
      } else if (foundItem) {
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



export const { addCartItem, decrementCartItem, removeCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
