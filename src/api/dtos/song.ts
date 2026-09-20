export interface song {
  id: string;
  title: string;
  album: string;
  author: string;
  authorId: number;
  duration: string;
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
