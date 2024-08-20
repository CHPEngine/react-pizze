import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ISortItem } from './filterSlice';

type FetchPizzasParams = {
  isOrderByDesc: boolean;
  selectedCategoryIndex: number;
  searchInput: string;
  currentPage: number;
  selectedSortItem: ISortItem;
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasParams>(
  'pizza/fetchPizzas',
  async (params: FetchPizzasParams) => {
    const { isOrderByDesc, selectedCategoryIndex, searchInput, currentPage, selectedSortItem } =
      params;
    const orderByQueryParam = `${isOrderByDesc ? '&order=desc' : ''}`;
    const categoryQueryParam = `${
      selectedCategoryIndex ? `&category=${selectedCategoryIndex}` : ''
    }`;
    const searchQueryParam = `${searchInput ? `&search=${searchInput}` : ''}`;

    const url =
      'https://66a7aa6253c13f22a3d0a541.mockapi.io/pizzas' +
      `?limit=4&page=${currentPage + 1}&sortBy=` +
      selectedSortItem.sortKey +
      orderByQueryParam +
      categoryQueryParam +
      searchQueryParam;

    const { data } = await axios.get<Pizza[]>(url);
    return data;
  },
);

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

interface PizzaSliceState {
  items: Pizza[];
  fetchStatus: FetchStatus;
}

const initialState: PizzaSliceState = {
  items: [],
  fetchStatus: FetchStatus.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.fetchStatus = FetchStatus.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.SUCCESSED;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.fetchStatus = FetchStatus.FAILED;
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
