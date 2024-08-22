import { CartItemState, CartSliceState } from "../redux/slices/cart/types";


export type PizzaTotals = Pick<CartSliceState, 'totalPrice' | 'totalCount'>

export default function calculateTotals(items: CartItemState[]): PizzaTotals {
  return {
    totalPrice: items.reduce((sum, obj) => obj.price * obj.count + sum, 0),
    totalCount: items.reduce((sum, obj) => (sum += obj.count), 0),
  };
}
