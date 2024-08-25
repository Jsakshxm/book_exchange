"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PostBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for submitting book data to Supabase
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Book Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="genre">Genre</Label>
        <Input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Post Book
      </Button>
    </form>
  );
}
