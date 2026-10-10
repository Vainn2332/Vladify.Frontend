import type { playlist } from "../../api/dtos/playlist";
import type { song } from "../../api/dtos/song";
import type { user } from "../../api/dtos/user";
import { SearchData } from "./SearchData";

interface SearchResponse {
  //temporary stub for mock data
  songs: song[];
  playlists: playlist[];
  users: user[];
}

const imageUrl = (id: string) => `https://picsum.photos/seed/track4/${id}/300`;

interface SearchResultProps {
  searchResult: SearchResponse;
  onClick: (id: string) => void;
}

export function SearchResult({ searchResult, onClick }: SearchResultProps) {
  return (
    <div className="fixed top-0 left-0 flex max-w-72 flex-col rounded-2xl bg-white">
      {searchResult.songs.map((song) => (
        <SearchData
          key={song.id}
          id={song.id}
          imageUrl={imageUrl(song.id)}
          title={song.title}
          subtitle={song.author}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
