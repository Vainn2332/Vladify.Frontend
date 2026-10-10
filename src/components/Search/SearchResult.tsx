import type { playlist } from "../../api/dtos/playlist";
import type { song } from "../../api/dtos/song";
import type { user } from "../../api/dtos/user";
import { SearchData } from "./SearchData";

export interface SearchResponse {
  //temporary stub for mock data
  songs: song[];
  playlists: playlist[];
  users: user[];
}

const imageUrl = (id: string) => `https://picsum.photos/seed/${id}/300/300`;

interface SearchResultProps {
  searchResult: SearchResponse;
  onClick: (id: string) => void;
}

export function SearchResult({ searchResult, onClick }: SearchResultProps) {
  return (
    <div className="absolute inset-x-4 top-full z-10 mt-1 overflow-hidden rounded-2xl bg-white shadow-md sm:inset-x-auto sm:left-0 sm:w-full">
      <div className="flex max-h-48 scrollbar-thin flex-col gap-1 overflow-y-auto py-2 pr-1 pl-2">
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
            subtitle={`${user.age} years old`}
            description="user"
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
