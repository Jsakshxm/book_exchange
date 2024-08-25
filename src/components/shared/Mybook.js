// components/MyBooks.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyBooks() {
  const books = [
    { title: "1984", author: "George Orwell", genre: "Dystopian" },
    { title: "Brave New World", author: "Aldous Huxley", genre: "Science Fiction" },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">My Books</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
