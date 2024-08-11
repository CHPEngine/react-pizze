import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategoryIndex: 0,
  currentPage: 0,
  isOrderByDesc: false,
  selectedSortItem: {
    name: 'популярности',
    sortKey: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategoryIndex = action.payload;
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

export const { selectCategory, setIsOrderByDesc, setSelectedSortItem, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
