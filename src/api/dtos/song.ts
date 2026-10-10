export interface song {
  id: string;
  title: string;
  album: string;
  author: string;
  authorId: string;
  duration: string;
  addedAt: string;
  coverUrl: string;
}

export interface addSongDto {
  title: string;
  album: string;
  duration: string;
}

export interface updateSongDto {
  id: string;
  title: string;
  album: string;
}
