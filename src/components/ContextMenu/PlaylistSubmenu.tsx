import { useMutation, useQuery } from "@tanstack/react-query";
import { playlistMutations } from "../../api/playlist/playlistMutations";
import { playlistQueries } from "../../api/playlist/playlistQueries";
import type { Song } from "../../api/song/song";
import { ContextMenuItem } from "./ContextMenuItem";

interface PlaylistSubmenuProps {
  song: Song;
  onClose: () => void;
}

export function PlaylistSubmenu({ song, onClose }: PlaylistSubmenuProps) {
  const {
    data: response,
    isPending,
    isError,
  } = useQuery(playlistQueries.page({ pageNumber: 1, pageSize: 50 }));
  const addSongToPlaylist = useMutation(playlistMutations.addSongToPlaylist);

  const playlists = response?.data ?? [];

  return (
    <div className="shadow-card absolute top-0 right-full z-60 mr-2 -translate-y-2 rounded-xl border border-white bg-gray-100 p-2">
      <div className="flex max-h-60 max-w-24 flex-col overflow-y-auto sm:min-w-50">
        {isPending && (
          <p className="p-2 text-sm text-black/60">Loading playlists...</p>
        )}
        {isError && (
          <p className="p-2 text-sm text-black/60">Failed to load playlists</p>
        )}
        {!isPending && !isError && playlists.length === 0 && (
          <p className="p-2 text-sm text-black/60">Create a playlist</p>
        )}
        {playlists.map((playlist) => (
          <ContextMenuItem
            key={playlist.id}
            text={playlist.name}
            onClick={() => {
              addSongToPlaylist.mutate(
                { playlistId: playlist.id, songId: song.id },
                {
                  onSuccess: onClose,
                  onError: (error) =>
                    console.error("Failed to add song to playlist", error),
                },
              );
              onClose();
            }}
          />
        ))}
      </div>
    </div>
  );
}
