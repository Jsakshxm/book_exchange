"use client"
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function MyBooks() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy book data (replace with actual user data)
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction" },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-fiction" },
    { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian" },
  ];

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Book Cards */}
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
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
