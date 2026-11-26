import { useEffect, useState } from "react";
import { Clock as ClockIcon } from "lucide-react";
import { SongRow } from "./SongRow";
import type { Song } from "../../../api/song/song";

interface SongSectionProps {
  songs: Song[];
  showStatus?: boolean;
  onDelete?: (id: string) => void;
  onClick: (id: string) => void;
}

export function SongSection({
  songs,
  showStatus = false,
  onDelete,
  onClick,
}: SongSectionProps) {
  const [openMenuSongId, setOpenMenuSongId] = useState<string | null>(null);

  useEffect(() => {
    if (!openMenuSongId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenuSongId(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openMenuSongId]);

  if (songs.length === 0)
    return (
      <div className="text-secondary flex h-32 justify-center">
        No songs in this playlist.
      </div>
    );

  const toggleMenu = (id: string) =>
    setOpenMenuSongId((current) => (current === id ? null : id));

  const closeMenu = () => setOpenMenuSongId(null);

  return (
    <table className="sm:text-medium w-full table-fixed overflow-hidden rounded-xl bg-white/85 text-left text-xs">
      <thead className="text-2xs border-b border-black/10 text-black/50 uppercase sm:text-xs">
        <tr>
          <th className="w-8 p-2 text-center sm:w-10">#</th>
          <th className="p-2 py-4">Title</th>
          <th className="hidden p-2 sm:table-cell">Album</th>
          {showStatus && <th className="w-14 p-2 pl-2 sm:w-auto">Status</th>}
          <th className="w-12 p-2 sm:w-20">
            <ClockIcon className="size-4" />
          </th>
          <th className="w-10 sm:w-12" />
        </tr>
      </thead>

      <tbody>
        {songs.map((song, index) => (
          <SongRow
            index={index}
            song={song}
            onClick={onClick}
            showStatus={showStatus}
            key={song.id}
            isMenuOpen={openMenuSongId === song.id}
            onToggleMenu={toggleMenu}
            onCloseMenu={closeMenu}
            onDeleteSong={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
