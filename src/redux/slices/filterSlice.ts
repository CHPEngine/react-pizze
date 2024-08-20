import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortNames {
  POPULAR = 'популярности',
  ALPHABET = 'алфавиту',
  PRICE = 'цене',
}

export enum SortKeys {
  POPULAR = 'rating',
  ALPHABET = 'title',
  PRICE = 'price',
}

export interface ISortItem {
  name: SortNames;
  sortKey: SortKeys;
}

interface FilterSliceState {
  searchInput: string;
  selectedCategoryIndex: number;
  currentPage: number;
  isOrderByDesc: boolean;
  selectedSortItem: ISortItem;
}

const initialState: FilterSliceState = {
  searchInput: '',
  selectedCategoryIndex: 0,
  currentPage: 0,
  isOrderByDesc: false,
  selectedSortItem: {
    name: SortNames.POPULAR,
    sortKey: SortKeys.POPULAR,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategoryIndex = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },

    setIsOrderByDesc(state, aciton) {
      state.isOrderByDesc = aciton.payload;
    },

    setSelectedSortItem(state, action) {
      state.selectedSortItem = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  selectCategory,
  setIsOrderByDesc,
  setSelectedSortItem,
  setCurrentPage,
  setSearchInput,
} = filterSlice.actions;

export default filterSlice.reducer;
