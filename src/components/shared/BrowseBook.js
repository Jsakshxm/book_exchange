"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/utils/supabase";
import { getAllBooks } from "@/utils/bookSlice";
import { toast } from "react-toastify";
import {
  addSentRequest,
  setSentRequests,
  setReceivedRequests,
} from "@/utils/requestSlice";

export function BrowseBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.AllBooks) || [];
  const user = useSelector((state) => state.user.user?.user) || {};
  const [sentBookIds, setSentBookIds] = useState(new Set());


  useEffect(() => {
    const fetchAllBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select(`
          *,
          user:users!books_user_id_fkey (id, name)
        `);

      if (error) {
        console.error("Error fetching all books with users:", error);
      } else {
        dispatch(getAllBooks(data));
      }
    };

    fetchAllBooks();
  }, [dispatch]);

  const fetchAllRequests = async () => {
    const { data, error } = await supabase
      .from("requests")
      .select(`
        id,
        from_user_id,
        to_user_id,
        book_id,
        status,
        from_user:users!requests_from_user_id_fkey(id, name), 
        to_user:users!requests_to_user_id_fkey(id, name),   
        book:books(id, title)      
      `);

    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      const sentRequests = data.filter(
        (request) => request.from_user_id === user.id
      );
      const receivedRequests = data.filter(
        (request) => request.to_user_id === user.id
      );

      dispatch(setSentRequests(sentRequests));
      dispatch(setReceivedRequests(receivedRequests));

      // Store the book IDs for which the current user has already sent requests
      const sentIds = new Set(sentRequests.map((req) => req.book_id));
      setSentBookIds(sentIds);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, [dispatch, user.id]);

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle the "Send Request" button click
  const handleSendRequest = async (book) => {
    if (book.user.id === user.id) {
      toast.error("You cannot send a request for your own book!");
      return;
    }

    if (sentBookIds.has(book.id)) {
      toast.error("Request already sent for this book!");
      return;
    }

    try {
      const { data, error } = await supabase.from("requests").insert([
        {
          from_user_id: user.id,
          to_user_id: book.user.id,
          book_id: book.id,
          status: "pending"
        }
      ]);

      if (error) {
        console.error("Error sending request:", error);
        toast.error("Failed to send request.");
      } else {
        toast.success(`Request sent to ${book.user.name}!`);
        dispatch(addSentRequest(data[0]));
        setSentBookIds(new Set([...sentBookIds, book.id]));
      }
    } catch (err) {
      console.error("Error sending request:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Browse Books</h1>
        <Input
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Card key={book.id} className="w-full">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <p className="text-sm">Posted by: {book.user?.name || "Unknown"}</p>
              </CardHeader>
              <CardContent>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Description: {book.description}</p>
                <p>Language: {book.language}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleSendRequest(book)}
                  disabled={sentBookIds.has(book.id) || book.user.id === user.id}
                >
                  {sentBookIds.has(book.id) ? "Request Sent" : "Send Request"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No books found matching your search.</p>
        )}
      </div>
    </div>
  );
}

