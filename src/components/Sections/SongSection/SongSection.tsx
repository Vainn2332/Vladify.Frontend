import { Clock } from "lucide-react";
import { SongRow } from "./SongRow";
import type { song } from "../../../api/song/song";

interface SongSectionProps {
  songs: song[];
  showAddedAt?: boolean;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

export function SongSection({
  songs,
  showAddedAt = false,
  onDelete,
  onClick,
}: SongSectionProps) {
  if (songs.length === 0) return null;

  return (
    <table className="sm:text-medium w-full table-fixed overflow-hidden rounded-xl bg-white/85 text-left text-xs">
      <thead className="text-2xs border-b border-black/10 text-black/50 uppercase sm:text-xs">
        <tr>
          <th className="w-4 p-2 sm:p-4">#</th>
          <th className="p-4">Title</th>
          <th className="hidden p-4 sm:table-cell">Album</th>
          {showAddedAt && <th className="w-18 p-4 sm:w-auto">Date</th>}
          <th className="w-10 p-4 sm:w-20">
            <Clock className="size-4" />
          </th>
          <th className="w-10 p-4" />
        </tr>
      </thead>

      <tbody>
        {songs.map((song, index) => (
          <SongRow
            index={index}
            onDelete={onDelete}
            onClick={onClick}
            song={song}
            showAddedAt={showAddedAt}
            key={song.id}
          />
        ))}
      </tbody>
    </table>
  );
}
