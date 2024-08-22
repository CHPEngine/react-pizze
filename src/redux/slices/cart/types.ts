export type CartItemState = {
  id: string;
  title: string;
  price: number;
  count: number;
  type: string;
  size: string;
  imageUrl: string;
};

export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItemState[];
}
