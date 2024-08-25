import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
  },
  reducers: {
    SetBooks: (state, action) => {
      state.books = action.payload; // Replace books with fetched data
    },
    RemoveBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    // You can add SetBook here for adding individual books if needed
  },
});

export const { SetBooks, RemoveBook } = bookSlice.actions;
export default bookSlice.reducer;
