import type { SongStatus } from "../../api/song/songStatus";
import { SONG_STATUS_LABELS } from "../../api/song/songStatus";

const STATUS_DOT_STYLES: Record<SongStatus, string> = {
  0: "bg-yellow-400 shadow-glow-yellow",
  1: "bg-green-500 shadow-glow-green",
  2: "bg-red-400 shadow-glow-red",
};

interface SongStatusDotProps {
  songStatus: SongStatus;
  className?: string;
}

export function SongStatusDot({ songStatus, className }: SongStatusDotProps) {
  const label = SONG_STATUS_LABELS[songStatus];

  return (
    <div
      title={label}
      className={`size-2 rounded-full sm:size-3 ${STATUS_DOT_STYLES[songStatus]} ${className}`}
    />
  );
}
