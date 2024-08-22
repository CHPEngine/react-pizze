import { SortItem } from "../filter/types";

export interface Pizza {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export enum FetchStatus {
  LOADING = 'loading',
  SUCCESSED = 'succeeded',
  FAILED = 'failed',
}

export interface PizzaSliceState {
  items: Pizza[];
  fetchStatus: FetchStatus;
}

export type FetchPizzasParams = {
  isOrderByDesc: boolean;
  selectedCategoryIndex: number;
  searchInput: string;
  currentPage: number;
  selectedSortItem: SortItem;
};