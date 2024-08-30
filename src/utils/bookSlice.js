import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    AllBooks: [],
  },
  reducers: {
    SetBooks: (state, action) => {
      state.books = action.payload; 
    },
    RemoveBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    getAllBooks: (state, action) => {
      state.AllBooks = action.payload; 
    },
  },
});

export const { SetBooks, RemoveBook, getAllBooks } = bookSlice.actions;
export default bookSlice.reducer;
