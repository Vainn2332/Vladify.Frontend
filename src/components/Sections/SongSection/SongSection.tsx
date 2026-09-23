import { Clock } from "lucide-react";
import { SongRow } from "./SongRow";
import type { song } from "../../../models/song";

interface SongSectionProps {
  songs: song[];
  showAddedAt?: boolean;
  onDelete: (id: string) => void;
}

export function SongSection({
  songs,
  showAddedAt = false,
  onDelete,
}: SongSectionProps) {
  if (songs.length === 0) return null;

  return (
    <table className="w-full text-left">
      <thead className="border-b border-black/10 text-xs text-black/50 uppercase">
        <tr>
          <th className="w-8 p-2 font-normal">#</th>
          <th className="p-2 font-normal">Название</th>
          <th className="p-2 pl-13 font-normal">Альбом</th>
          {showAddedAt && <th className="p-2 font-normal">Дата добавления</th>}
          <th className="w-16 p-2 font-normal">
            <Clock className="size-4" />
          </th>
          <th className="w-10" />
        </tr>
      </thead>

      <tbody>
        {songs.map((song, index) => (
          <SongRow index={index} onDelete={onDelete} song={song} />
        ))}
      </tbody>
    </table>
  );
}
