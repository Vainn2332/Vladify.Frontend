import { useEffect } from "react";
import { SearchData } from "./SearchData";
import type { SearchResult } from "../../api/search/searchResult";

const imageUrl = (id: string) => `https://picsum.photos/seed/${id}/300/300`;

interface SearchResultProps {
  searchResult: SearchResult;
  onClick: (id: string) => void;
  onClose: () => void;
}

export function SearchResult({
  searchResult,
  onClick,
  onClose,
}: SearchResultProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const hasResults =
    searchResult.songs.length > 0 ||
    searchResult.playlists.length > 0 ||
    searchResult.users.length > 0;

  return (
    <div className="absolute top-full left-1/2 z-10 mt-1 w-1/2 -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-md sm:left-0 sm:w-full sm:translate-x-0">
      <div className="flex h-48 scrollbar-thin flex-col gap-1 overflow-y-auto py-2 pr-1 pl-2">
        {!hasResults && (
          <div className="mt-auto mb-2 self-center"> No results found</div>
        )}
        {searchResult.songs.map((song) => (
          <SearchData
            key={song.id}
            id={song.id}
            imageUrl={imageUrl(song.id)}
            title={song.title}
            subtitle={song.author}
            description="song"
            onClick={onClick}
          />
        ))}
        {searchResult.playlists.map((playlist) => (
          <SearchData
            key={playlist.id}
            id={playlist.id}
            imageUrl={imageUrl(playlist.id)}
            title={playlist.name}
            subtitle={playlist.authorName}
            description="playlist"
            onClick={onClick}
          />
        ))}
        {searchResult.users.map((user) => (
          <SearchData
            key={user.id}
            id={user.id}
            imageUrl={imageUrl(user.id)}
            title={user.name}
            description="user"
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
