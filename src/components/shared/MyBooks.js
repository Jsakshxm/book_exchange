"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardGrid } from "./CardGrid";
import { SearchBar } from "./SearchBar";
import EditBook from "./EditBooks"; 

import { SetBooks } from "@/utils/bookSlice";
import { fetchBooks } from "@/utils/fetchBooks";

export function MyBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const user = useSelector((state) => state.user.user.user); 
  const books = useSelector((state) => state.book.books); 
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (user) {
      fetchBooks(user.id, dispatch, SetBooks); 
    }
  }, [user, dispatch]); 
  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {editingBook ? (
        <EditBook book={editingBook} setEditingBook={setEditingBook} />
      ) : (
        <CardGrid books={filteredBooks} setEditingBook={setEditingBook} />
      )}
    </div>
  );
}
