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
    <tr key={song.id} className="text-primary">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">
        <div className="flex items-center gap-3">
          <img
            className="aspect-square w-12 rounded"
            src={song.coverUrl}
            onError={(e) => (e.currentTarget.style.display = "none")}
            alt="song cover"
          />
          <div>
            <p className="text-medium">{song.title}</p>
            <p className="text-primary/50 text-sm">{song.author}</p>
          </div>
        </div>
      </td>
      <td className="p-2">{song.album}</td>
      {showAddedAt && <td className="p-2">{song.addedAt}</td>}
      <td className="p-2">{song.duration}</td>
      <td className="p-2">
        <IconButton
          className="aspect-square w-5 cursor-pointer"
          icon={DeleteIcon}
          onClick={() => onDelete(song.id)}
        />
      </td>
    </tr>
  );
}
