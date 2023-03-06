import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sortType: {
    name: 'популярности по убыванию',
    property: 'rating'
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.categoryId = Number(action.payload.categoryId);
      state.searchValue = action.payload.searchValue;
    }
  }
});

export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
