export type SongStatus = 0 | 1 | 2;

export const SONG_STATUS_LABELS: Record<SongStatus, string> = {
  0: "Pending",
  1: "Approved",
  2: "Rejected",
};
