import { Ellipsis as OptionsIcon } from "lucide-react";
import type { Song } from "../../../api/song/song";
import { IconButton } from "../../Buttons/IconButton";
import { formatDuration } from "../../../utils/formatDuration";
import { CoverImage } from "../../CoverImage/CoverImage";
import { SongStatusDot } from "../../SongStatusDot/SongStatusDot";
import { SongContextMenu } from "../../ContextMenu/SongContextMenu";

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
  return (
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

      <td className="relative z-60 p-2 text-center">
        {isMenuOpen && (
          <SongContextMenu
            song={song}
            onClose={onCloseMenu}
            onDeleteSong={onDeleteSong}
          />
        )}
        <IconButton
          className="aspect-square w-5 cursor-pointer hover:text-black/80"
          icon={OptionsIcon}
          onClick={(e) => {
            e.stopPropagation();
            onToggleMenu(song.id);
          }}
        />
      </td>
    </tr>
  );
}
