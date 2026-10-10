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
    <div className="absolute top-full left-0 z-10 mt-1 flex max-h-48 w-full flex-col overflow-y-scroll rounded-2xl bg-white p-3">
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
  );
}
