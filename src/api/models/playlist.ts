import type { song } from "./song";

export interface playlist {
  id: string;
  name: string;
  authorName: string;
  songs: song[];
}
