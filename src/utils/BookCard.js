import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleDelete } from "@/utils/handleDelete";

export function BookCard({ book, setEditingBook }) {
  return (
    <Card className="w-full">
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
        <Button variant="outline" onClick={() => setEditingBook(book)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDelete(book)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
