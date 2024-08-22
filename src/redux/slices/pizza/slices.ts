import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzasParams, FetchStatus, Pizza, PizzaSliceState } from './types';



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


export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
