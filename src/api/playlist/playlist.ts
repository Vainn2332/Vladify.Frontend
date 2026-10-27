import type { Song } from "../song/song";

export interface Playlist {
  id: string;
  name: string;
  isOwner: boolean;
  authorName: string;
  songs: Song[];
}

export interface CreatePlaylistDto {
  name: string;
}

export interface AddSongToPlaylistDto {
  playlistId: string;
  songId: string;
}

export interface UpdatePlaylistDto {
  id: string;
  name: string;
}

export interface DeleteSongFromPlaylistDto {
  playlistId: string;
  songId: string;
}

export interface PlaylistSearchResult {
  id: string;
  name: string;
  authorName: string;
}
