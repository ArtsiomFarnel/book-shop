import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooksStatus', async (params) => {
  const { currentPage, sortBy, order, category, search } = params;
  const { data } = await axios.get(
    `https://63ecb1a5be929df00cb0201a.mockapi.io/items?page=${currentPage}&limit=8&sortby=${sortBy}&order=${order}&category=${category}&search=${search}`
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading' //loading | success | error
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
      state.items = [];
      console.log('fetch books is pending...');
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
      console.log('books are received');
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = 'error';
      state.items = [];
      console.log('fetch books was rejected!');
    });
  }
});

export const selectBooks = (state) => state.books;

export const { setItems } = booksSlice.actions;
export default booksSlice.reducer;
