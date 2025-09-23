import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksBegin(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchBooksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    commentOnBookSuccess(state, action) {
      const { bookId, comment } = action.payload;
      const book = state.items.find((b) => b.id === bookId);
      if (book) {
        if (!book.comments) book.comments = [];
        book.comments.push(comment);
      }
    },
  },
});

export const {
  fetchBooksBegin,
  fetchBooksSuccess,
  fetchBooksFailure,
  commentOnBookSuccess,
} = booksSlice.actions;

export default booksSlice.reducer;
