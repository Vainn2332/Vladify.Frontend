import { TrashIcon } from "lucide-react";
import type { Song } from "../../api/song/song";
import { ContextMenuItem } from "./ContextMenuItem";

interface SongContextMenuProps {
  song: Song;
  onAddSongToPlaylist?: (id: string) => void;
  onDeleteSongFromPlaylist?: (id: string) => void;
  onDeleteSong?: (id: string) => void;
}

export function SongContextMenu({
  song,
  onAddSongToPlaylist,
  onDeleteSongFromPlaylist,
  onDeleteSong,
}: SongContextMenuProps) {
  return (
    <div
      className="absolute top-1/2 right-full z-60 -translate-y-3/4 rounded-xl border border-white bg-gray-100 p-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex min-w-50 flex-col truncate rounded-md">
        <ContextMenuItem text="Share with someone" icon={TrashIcon} />
        <ContextMenuItem text="Share with someone" icon={TrashIcon} />
        {onAddSongToPlaylist && (
          <ContextMenuItem
            text="Add to playlist"
            icon={TrashIcon}
            onClick={() => onAddSongToPlaylist(song.id)}
          />
        )}
        {onDeleteSongFromPlaylist && (
          <ContextMenuItem
            text="Delete from playlist"
            icon={TrashIcon}
            onClick={() => onDeleteSongFromPlaylist(song.id)}
          />
        )}
        {onDeleteSong && song.isAuthor && (
          <ContextMenuItem
            text="Delete song"
            icon={TrashIcon}
            onClick={() => onDeleteSong(song.id)}
          />
        )}
      </div>
    </div>
  );
}
