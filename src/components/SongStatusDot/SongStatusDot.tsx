import type { SongStatus } from "../../api/song/songStatus";
import { SONG_STATUS_LABELS } from "../../api/song/songStatus";

const STATUS_DOT_STYLES: Record<SongStatus, string> = {
  0: "bg-yellow-400 shadow-[0_0_8px_2px_rgba(250,204,21,0.45)]",
  1: "bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.45)]",
  2: "bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.45)]",
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
