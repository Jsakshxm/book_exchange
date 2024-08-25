"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase"; // Assuming Supabase client is configured

export default function EditBook({ book, setEditingBook }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [description, setDescription] = useState(book.description);
  const [language, setLanguage] = useState(book.language || "English"); // Default to English

  // Handle Save (Update the book details in Supabase)
  const handleSave = async () => {
    const { error } = await supabase
      .from("books")
      .update({
        title,
        author,
        genre,
        description,
        language,
      })
      .eq("id", book.id);

    if (error) {
      console.error("Error updating book:", error);
    } else {
      setEditingBook(null); // Close the edit form after saving
    }
  };

  const handleCancel = () => {
    setEditingBook(null); // Close the form without saving
  };

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="title">Book Title</label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <Input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="description">Book Description</label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="language">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </div>
    </form>
  );
}
