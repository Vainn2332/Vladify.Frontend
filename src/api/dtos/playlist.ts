import type { song } from "./song";

export interface playlist {
  id: string;
  name: string;
  authorName: string;
  songs: song[];
}

export interface createPlaylistDto {
  name: string;
}

export interface addSongToPlaylistDto{
  playlistId:string;
  songId:string;
}

export interface updatePlaylistDto{
  id:string
  name:string;
}

export interface deleteSongFromPlaylistDto{
  playlistId:string;
  songId:string;
}