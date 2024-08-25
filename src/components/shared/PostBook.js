"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { supabase } from "@/utils/supabase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PostBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('books')  // Replace 'books' with your actual table name
      .insert([
        {
          title: title,
          author: author,
          genre: genre,
          description:description,
          language: language,
          user_id: user.user.id
        }
      ]);

    if (error) {
      console.error('Error inserting book:', error);
    } else {
      console.log('Book added:', data);
      toast.success('Book added successfully!');
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setLanguage("");
    }
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
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="language">Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full" aria-label="Language">
            <span>{language || "Select Language"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="German">German</SelectItem>

            {/* Add more languages as needed */}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Post Book
      </Button>
    </form>
  );
}
