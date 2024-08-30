import { useState } from "react";
import { Label } from "@/components/ui/label"; // Importing the Label component from shadcn
import { Input } from "@/components/ui/input"; // Importing the Input component from shadcn
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { supabase } from "@/utils/supabase";

export default function MatchmakingPreferences() {
  const user = useSelector((state) => state.user.user);
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [author, setAuthor] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const savePreferences = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("preferences")
      .upsert({ user_id: user.user.id, genre, language, author }, { onConflict: "user_id" });

    if (error) {
      console.error("Error saving preferences:", error.message);
    } else {
      const { data: recommendations, error: fetchError } = await supabase
        .from("books")
        .select("*")
        .eq("genre", genre)
        .eq("author", author);

      if (fetchError) {
        console.error("Error fetching recommendations:", fetchError.message);
      } else {
        setRecommendations(recommendations);
        console.log(recommendations);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Matchmaking Preferences</h2>

      <form className="space-y-4" onSubmit={savePreferences}>
        {/* Genre Preference */}
        <div>
          <Label htmlFor="genre" className="block text-sm font-medium">
            Preferred Genre
          </Label>
          <Input
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full mt-1"
            placeholder="Enter your preferred genre"
          />
        </div>

        {/* Language Preference */}
        <div>
          <Label htmlFor="language" className="block text-sm font-medium">
            Preferred Language
          </Label>
          <Input
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full mt-1"
            placeholder="Enter your preferred language"
          />
        </div>

        {/* Author Preference */}
        <div>
          <Label htmlFor="author" className="block text-sm font-medium">
            Preferred Author
          </Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full mt-1"
            placeholder="Enter your preferred author"
          />
        </div>

        <Button type="submit">Save Preferences</Button>
      </form>

      {/* Recommendations Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Recommended Books</h3>
        <ul className="mt-4 space-y-2">
          {recommendations.map((book) => (
            <li key={book.id} className="p-4 bg-white rounded shadow">
              <h4 className="font-bold text-md">{book.title}</h4>
              <p className="text-sm">Author: {book.author}</p>
              <p className="text-sm">Genre: {book.genre}</p>
              <p className="text-sm">Language: {book.language}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
