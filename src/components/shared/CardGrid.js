import { Card } from "@/components/ui/card";
import { BookCard } from "../../utils/BookCard";
import { Separator } from "@/components/ui/separator";

export function CardGrid({ books, setEditingBook }) {
  return (
    <>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} setEditingBook={setEditingBook} />
          ))
        ) : (
          <p>No books found matching your search.</p>
        )}
      </div>
    </>
  );
}
