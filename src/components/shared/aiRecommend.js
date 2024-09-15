"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import genAI from "@/utils/gemini"; // Assuming this is your AI helper

export default function RecommendedBooks() {
  const [genre, setGenre] = useState("");
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    if (!genre) return;

    setLoading(true);
    setError(null);

    try {
      const prompt = `Act as a book recommendation system and suggest some books for the query: ${genre}. Only give me the names of 5 books with the author, comma-separated, like the example given ahead. Example: Harry Potter Series by J.K. Rowling, The Diary of a Young Girl by Anne Frank, The Alchemist by Paulo Coelho, To Kill a Mockingbird by Harper Lee, 1984 by George Orwell`;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });
     
      const result = await model.generateContent(prompt);
      const text =  result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log(text);

      const recommendations = result.response.text().split(",").map((item) => {
        const [title, author] = item.split(" by ");
        return { title: title.trim(), author: author?.trim() };
      });

      setRecommendedBooks(recommendations);}
     catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto space-y-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold">Get Book Recommendations</h2>

      {/* Search Input */}
      <div className="space-y-2">
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
          Enter Genre or Type
        </label>
        <Input
          id="genre"
          type="text"
          placeholder="e.g., Fantasy, Sci-Fi"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Fetch Recommendations Button */}
      <Button
        onClick={fetchRecommendations}
        className="w-full"
        disabled={!genre.trim() || loading}
      >
        {loading ? "Fetching..." : "Get Recommendations"}
      </Button>

      {/* Display Recommended Books */}
      <div className="space-y-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : recommendedBooks.length > 0 ? (
          recommendedBooks.map((book, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Author: {book.author || "Unknown"}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No recommendations yet. Try searching for a genre!</p>
        )}
      </div>
    </div>
  );
}
