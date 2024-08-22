import { CartSliceState } from '../redux/slices/cart/types';
import calculateTotals from './calculatePizzaTotals';

export default function getItemsFromLocalStorage(): CartSliceState {
  try {
    const jsonItems = localStorage.getItem('items');

    if (!jsonItems) {
      return getDefaultStates();
    }

    const cartItems = JSON.parse(jsonItems);

    return { items: cartItems, ...calculateTotals(cartItems) };
  } catch (error) {
    console.error('Error parsing local storage with key - items');
    return getDefaultStates();
  }
}

const getDefaultStates = (): CartSliceState => {
  return {
    totalCount: 0,
    totalPrice: 0,
    items: [],
  };
};
