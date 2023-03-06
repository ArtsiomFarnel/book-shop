import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortType, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sortType: {
    name: 'популярности по убыванию',
    property: SortPropertyEnum.RATING_DESC
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.categoryId = Number(action.payload.categoryId);
      state.searchValue = action.payload.searchValue;
    }
  }
});

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
