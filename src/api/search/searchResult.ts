import type { PlaylistSearchResult } from "../playlist/playlist";
import type { SongSearchResult } from "../song/song";
import type { UserSearchResult } from "../dtos/user";

export interface SearchResult {
  songs: SongSearchResult[];
  playlists: PlaylistSearchResult[];
  users: UserSearchResult[];
}
