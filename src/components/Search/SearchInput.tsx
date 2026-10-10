import type { ComponentPropsWithRef } from "react";
import { SearchResult, type SearchResponse } from "./SearchResult";

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

export function SearchInput({
  className,
  ...props
}: ComponentPropsWithRef<"input">) {
  return (
    <div className={`sm:relative ${className}`}>
      <input
        type="text"
        placeholder="Search"
        {...props}
        className="w-full rounded-2xl bg-white/85 py-1 text-center text-cyan-950 shadow-sm backdrop-blur-md transition-colors duration-200 outline-none hover:bg-white/70 focus:bg-white/70"
      />
      <SearchResult
        searchResult={seedData}
        onClick={(id) => console.log(`id clicked: ${id}`)}
      />
    </div>
  );
}
