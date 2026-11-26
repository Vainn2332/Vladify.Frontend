import { useState } from "react";
import { TrashIcon, Plus as AddIcon } from "lucide-react";
import type { Song } from "../../api/song/song";
import { SONG_STATUS } from "../../api/song/songStatus";
import { ContextMenuItem } from "./ContextMenuItem";
import { PlaylistSubmenu } from "./PlaylistSubmenu";

interface SongContextMenuProps {
  song: Song;
  onClose?: () => void;
  onDeleteSongFromPlaylist?: (id: string) => void;
  onDeleteSong?: (id: string) => void;
}

export function SongContextMenu({
  song,
  onClose,
  onDeleteSongFromPlaylist,
  onDeleteSong,
}: SongContextMenuProps) {
  const [isPlaylistPanelOpen, setIsPlaylistPanelOpen] = useState(false);
  const close = () => {
    onClose?.();
    setIsPlaylistPanelOpen(false);
  };

  return (
    <div
      className="shadow-card absolute top-1/2 right-full z-60 -translate-y-3/4 rounded-xl border border-white bg-gray-100 p-2"
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => setIsPlaylistPanelOpen(false)}
    >
      <div className="flex min-w-50 flex-col rounded-md">
        {song.status === SONG_STATUS.Approved && (
          <div
            className="relative"
            onMouseEnter={() => setIsPlaylistPanelOpen(true)}
          >
            <ContextMenuItem
              className="w-full"
              text="Add to playlist"
              icon={AddIcon}
              onClick={() => setIsPlaylistPanelOpen(true)}
            />
            {isPlaylistPanelOpen && (
              <PlaylistSubmenu song={song} onClose={close} />
            )}
          </div>
        )}

        {onDeleteSongFromPlaylist && (
          <ContextMenuItem
            text="Delete from playlist"
            icon={TrashIcon}
            onMouseEnter={() => setIsPlaylistPanelOpen(false)}
            onClick={() => {
              onDeleteSongFromPlaylist(song.id);
              close();
            }}
          />
        )}

        {onDeleteSong && song.isAuthor && (
          <ContextMenuItem
            text="Delete song"
            icon={TrashIcon}
            onMouseEnter={() => setIsPlaylistPanelOpen(false)}
            onClick={() => {
              onDeleteSong(song.id);
              close();
            }}
          />
        )}
      </div>
    </div>
  );
}
