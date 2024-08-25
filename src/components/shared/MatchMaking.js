import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function MatchmakingPreferences() {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Matchmaking Preferences</h2>

      <form className="space-y-4">
        {/* Genre Preference */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Preferred Genre
          </label>
          <Select>
            <SelectTrigger id="genre" className="w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="sci-fi">Science Fiction</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language Preference */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Preferred Language
          </label>
          <Select>
            <SelectTrigger id="language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">Save Preferences</Button>
      </form>
    </div>
  );
}
