import { useEffect, useRef, useState, type ComponentPropsWithRef } from "react";
import { SearchResult, type SearchResponse } from "./SearchResult";
import { useDebounce } from "../../hooks/useDebounce";

const seedData: SearchResponse = {
  songs: [
    {
      addedAt: "2023-06-01",
      album: "Album 1",
      author: "Author 1",
      authorId: 21,
      coverUrl: "https://picsum.photos/seed/song1/300/300",
      duration: "3:45",
      id: "song1",
      title: "Song 1",
    },
    {
      addedAt: "2023-06-01",
      album: "Album 1asdasd",
      author: "Author 1sssdas",
      authorId: 21,
      coverUrl: "https://picsum.photos/seed/song1/300/300",
      duration: "3:45",
      id: "song1",
      title: "Song 1zxcvdsdf",
    },
    {
      addedAt: "2023-06-01",
      album: "Album 1",
      author: "Author 1",
      authorId: 21,
      coverUrl: "https://picsum.photos/seed/song1/300/300",
      duration: "3:45",
      id: "song1",
      title: "Song 1",
    },
    {
      addedAt: "2023-06-01",
      album: "Album 1",
      author: "Author 1",
      authorId: 21,
      coverUrl: "https://picsum.photos/seed/song1/300/300",
      duration: "3:45",
      id: "song1",
      title: "Song 1",
    },
  ],
  playlists: [
    {
      authorName: "Author 1",
      id: "playlist1",
      name: "Playlist 1",
      songs: [],
    },
  ],
  users: [
    {
      id: "user1",
      name: "User 1",
      age: 25,
      emailAddress: "user1@example.com",
      externalId: "external1",
      gender: 1,
    },
  ],
};

const DELAY_MS = 300;

export function SearchInput({
  className,
  ...props
}: ComponentPropsWithRef<"input">) {
  const [searchResultIsOpen, setSearchResultIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, DELAY_MS);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchResultIsOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setSearchResultIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [searchResultIsOpen]);

  const trimmedQuery = query.trim();
  const showResults =
    searchResultIsOpen && trimmedQuery !== "" && debouncedQuery.trim() !== "";

  return (
    <div ref={containerRef} className={`sm:relative ${className}`}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        {...props}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearchResultIsOpen(true);
        }}
        onFocus={() => setSearchResultIsOpen(true)}
        className="w-full rounded-2xl bg-white/85 py-1 text-center text-cyan-950 shadow-sm backdrop-blur-md transition-colors duration-200 outline-none hover:bg-white/70 focus:bg-white/70"
      />
      {showResults && (
        <SearchResult
          searchResult={seedData}
          onClick={(id) => console.log(`id clicked: ${id}`)}
          onClose={() => setSearchResultIsOpen(false)}
        />
      )}
    </div>
  );
}
