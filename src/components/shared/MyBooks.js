"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import EditBook from "./EditBooks"; 
import { supabase } from "@/utils/supabase";
import { SetBooks, RemoveBook } from "@/utils/bookSlice";
import { toast } from "react-toastify";

export function MyBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const user = useSelector((state) => state.user.user.user); // Get current user
  const books = useSelector((state) => state.book.books); // Get books from Redux state
  const dispatch = useDispatch(); // Setup dispatch

  // Fetch books from Supabase and dispatch to Redux store
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", user.id); 

      if (error) {
        console.error("Error fetching books:", error);
      } else {
        console.log("Fetched books:", data);
        dispatch(SetBooks(data)); // Dispatch fetched books to Redux store
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [user, dispatch]); // Run when user or dispatch changes

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit button click
  const handleEdit = (book) => {
    setEditingBook(book);
  };

  // Handle delete button click
  const handleDelete = async (book) => {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", book.id); // Delete the book where the id matches
  
    if (error) {
      console.error("Error deleting book:", error);
    } else {
      toast.warn("Book deleted successfully!");
      dispatch(RemoveBook(book.id)); // Remove book from Redux state
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Books</h1>
        <Input
          placeholder="Search your books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

      <Separator className="my-4" />

      {/* Show EditBook component when editing */}
      {editingBook ? (
        <EditBook book={editingBook} setEditingBook={setEditingBook} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Card key={book.id} className="w-full">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p>Description: {book.description}</p>
                  <p>Language: {book.language}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleEdit(book)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(book)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No books found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
}
