import { createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, SortKeys, SortNames } from './types';

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

export const {
  selectCategory,
  setIsOrderByDesc,
  setSelectedSortItem,
  setCurrentPage,
  setSearchInput,
} = filterSlice.actions;

export default filterSlice.reducer;
