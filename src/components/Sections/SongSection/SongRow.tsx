import { Trash2 as DeleteIcon } from "lucide-react";
import type { song } from "../../../models/song";
import { IconButton } from "../../Buttons/IconButton";

interface SongRowProps {
  index: number;
  song: song;
  onDelete: (id: string) => void;
  showAddedAt?: boolean;
}

export function SongRow({
  index,
  song,
  onDelete,
  showAddedAt = false,
}: SongRowProps) {
  return (
    <tr className="text-primary hover:bg-primary/10 cursor-pointer">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2">
        <div className="flex items-center gap-3">
          <img
            className="aspect-square w-12 rounded"
            src={song.coverUrl}
            onError={(e) => (e.currentTarget.style.display = "none")}
            alt="song cover"
          />
          <div className="max-w-30">
            <p className="truncate font-bold">{song.title}</p>
            <p className="text-secondary truncate">{song.author}</p>
          </div>
        </div>
      </td>
      <td className="hidden p-2 sm:table-cell">{song.album}</td>
      {showAddedAt && <td className="p-2">{song.addedAt}</td>}
      <td className="p-2">{song.duration}</td>
      <td className="p-2 text-center">
        <IconButton
          className="aspect-square w-5 cursor-pointer"
          icon={DeleteIcon}
          onClick={() => onDelete(song.id)}
        />
      </td>
    </tr>
  );
}
