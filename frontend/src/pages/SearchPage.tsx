/* Search page — Frappe LMS style */
import { Search } from "lucide-react";
import { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      <div className="relative max-w-3xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for a keyword or phrase and press enter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm bg-card focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {query && (
        <p className="mt-8 text-sm text-muted-foreground">No results found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchPage;
