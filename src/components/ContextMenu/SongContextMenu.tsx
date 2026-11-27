import { useEffect, useRef, useState, type RefObject } from "react";
import { TrashIcon, Plus as AddIcon } from "lucide-react";
import type { Song } from "../../api/song/song";
import { SONG_STATUS } from "../../api/song/songStatus";
import { ContextMenuItem } from "./ContextMenuItem";
import { PlaylistSubmenu } from "./PlaylistSubmenu";

export interface MenuPosition {
  top: number;
  left: number;
}

interface SongContextMenuProps {
  song: Song;
  position: MenuPosition;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose?: () => void;
  onDeleteSongFromPlaylist?: (id: string) => void;
  onDeleteSong?: (id: string) => void;
}

export function SongContextMenu({
  song,
  position,
  triggerRef,
  onClose,
  onDeleteSongFromPlaylist,
  onDeleteSong,
}: SongContextMenuProps) {
  const [isPlaylistSubmenuOpen, setIsPlaylistSubmenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => {
    onClose?.();
    setIsPlaylistSubmenuOpen(false);
  };

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const isInsideMenu = menuRef.current?.contains(target);
      const isTrigger = triggerRef.current?.contains(target);

      if (!isInsideMenu && !isTrigger) onClose?.();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [onClose, triggerRef]);

  return (
    <div
      ref={menuRef}
      className="shadow-card fixed z-60 -translate-x-full -translate-y-3/4 rounded-xl border border-white bg-gray-100 p-2"
      style={{ top: position.top, left: position.left }}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => setIsPlaylistSubmenuOpen(false)}
    >
      <div className="flex min-w-50 flex-col rounded-md">
        {song.status === SONG_STATUS.Approved && (
          <div
            className="relative"
            onMouseEnter={() => setIsPlaylistSubmenuOpen(true)}
          >
            <ContextMenuItem
              text="Add to playlist"
              className="w-full"
              icon={AddIcon}
              onClick={() => setIsPlaylistSubmenuOpen(true)}
            />
            {isPlaylistSubmenuOpen && (
              <PlaylistSubmenu song={song} onClose={close} />
            )}
          </div>
        )}

        {onDeleteSongFromPlaylist && (
          <ContextMenuItem
            text="Delete from playlist"
            icon={TrashIcon}
            onMouseEnter={() => setIsPlaylistSubmenuOpen(false)}
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
            onMouseEnter={() => setIsPlaylistSubmenuOpen(false)}
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
