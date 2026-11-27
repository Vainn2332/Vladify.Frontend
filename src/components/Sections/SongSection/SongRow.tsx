import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Ellipsis as OptionsIcon } from "lucide-react";
import type { Song } from "../../../api/song/song";
import { IconButton } from "../../Buttons/IconButton";
import { formatDuration } from "../../../utils/formatDuration";
import { CoverImage } from "../../CoverImage/CoverImage";
import { SongStatusDot } from "../../SongStatusDot/SongStatusDot";
import {
  SongContextMenu,
  type MenuPosition,
} from "../../ContextMenu/SongContextMenu";

interface SongRowProps {
  index: number;
  song: Song;
  onClick: (id: string) => void;
  showStatus?: boolean;
  isMenuOpen: boolean;
  onToggleMenu: (id: string) => void;
  onCloseMenu: () => void;
  onDeleteSong?: (id: string) => void;
}

export function SongRow({
  index,
  song,
  onClick,
  showStatus = false,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onDeleteSong,
}: SongRowProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const handleToggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({ top: rect.top + rect.height / 2, left: rect.left - 4 });
    }

    onToggleMenu(song.id);
  };

  return (
    <>
      <tr
        className="text-primary hover:bg-primary/10 cursor-pointer"
        onClick={() => {
          onCloseMenu();
          onClick(song.id);
        }}
      >
        <td className="p-2 text-center">{index + 1}</td>
        <td className="p-2 pl-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <CoverImage alt="song cover" url={song.coverUrl} size="xs" />
            <div className="overflow-hidden">
              <p className="truncate font-bold">{song.title}</p>
              <p className="text-secondary truncate">{song.author}</p>
            </div>
          </div>
        </td>
        <td className="hidden p-2 sm:table-cell">{song.album}</td>
        {showStatus && (
          <td className="p-2">
            <SongStatusDot className="ml-3" songStatus={song.status} />
          </td>
        )}
        <td className="p-2">{formatDuration(song.duration)}</td>

        <td className="relative p-2 text-center">
          <IconButton
            ref={buttonRef}
            className="aspect-square w-5 cursor-pointer hover:text-black/80"
            icon={OptionsIcon}
            onClick={handleToggleMenu}
          />
        </td>
      </tr>

      {isMenuOpen &&
        menuPosition &&
        createPortal(
          <SongContextMenu
            song={song}
            position={menuPosition}
            onClose={onCloseMenu}
            onDeleteSong={onDeleteSong}
            triggerRef={buttonRef}
          />,
          document.body,
        )}
    </>
  );
}
