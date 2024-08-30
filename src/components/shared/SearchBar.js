import { Input } from "@/components/ui/input";

export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">My Books</h1>
      <Input
        placeholder="Search your books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64"
      />
    </div>
  );
}
