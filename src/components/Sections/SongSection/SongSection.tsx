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

  //TODO: СДЕЛАТЬ АДАПТИВНОСТЬ, СДЕЛАТЬ ПО ЦЕНТРУ НЕКОТОРЫЕ ПОЛЯ,ПОПРАВИТЬ PADDING
  return (
    <table className="sm:text-medium w-full overflow-hidden rounded-xl bg-white/85 text-left text-xs">
      <thead className="border-b border-black/10 text-xs text-black/50 uppercase">
        <tr>
          <th className="w-8 p-4">#</th>
          <th className="p-2">Название</th>
          <th className="hidden p-2 sm:table-cell">Альбом</th>
          {showAddedAt && <th className="p-4">Дата добавления</th>}
          <th className="p-4">
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
            song={song}
            showAddedAt={showAddedAt}
            key={song.id}
          />
        ))}
      </tbody>
    </table>
  );
}
