export interface Song {
  id: string;
  title: string;
  album: string;
  author: string;
  authorId: number;
  duration: string;
  addedAt: string;
  coverUrl: string;
}

export interface AddSongDto {
  title: string;
  album: string;
  duration: string;
}

export interface UpdateSongDto {
  id: string;
  title: string;
  album: string;
}

export interface SongSearchResult {
  id: string;
  title: string;
  author: string;
  audioUrl: string;
  coverUrl: string;
}
