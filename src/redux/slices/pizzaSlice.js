import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
  const { isOrderByDesc, selectedCategoryIndex, searchInput, currentPage, selectedSortItem } =
    params;
  const orderByQueryParam = `${isOrderByDesc ? '&order=desc' : ''}`;
  const categoryQueryParam = `${selectedCategoryIndex ? `&category=${selectedCategoryIndex}` : ''}`;
  const searchQueryParam = `${searchInput ? `&search=${searchInput}` : ''}`;

  const url =
    'https://66a7aa6253c13f22a3d0a541.mockapi.io/pizzas' +
    `?limit=4&page=${currentPage + 1}&sortBy=` +
    selectedSortItem.sortKey +
    orderByQueryParam +
    categoryQueryParam +
    searchQueryParam;

  const response = await axios.get(url);
  return response.data;
});

const initialState = {
  items: [],
  fetchStatus: 'loading',
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
        state.fetchStatus = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.fetchStatus = 'failed';
      });
  },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
