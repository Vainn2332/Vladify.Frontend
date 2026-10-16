import { useState } from "react";
import { PlaylistHeader } from "../../components/PlaylistHeader/PlaylistHeader";
import { SongSection } from "../../components/Sections/SongSection/SongSection";
import type { song } from "../../api/song/song";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { TextInputModal } from "../../components/Modals/TextInputModal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { playlistQueries } from "../../api/playlist/playlistQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { playlistMutations } from "../../api/playlist/playlistMutations";

interface PlaylistPageContentProps {
  playlistId: string;
}

const headerImageUrl = "https://picsum.photos/seed/late-night-drive/300/300";

export function PlaylistPage() {
  const { playlistId } = useParams<string>();

  if (!playlistId) return <Navigate to="/MyPlaylists" replace />;

  return <PlaylistPageContent key={playlistId} playlistId={playlistId} />;
}

function PlaylistPageContent({ playlistId }: PlaylistPageContentProps) {
  const [songToDelete, setSongToDelete] = useState<song | null>(null);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeletePlaylistModalOpen, setIsDeletePlaylistModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery(
    playlistQueries.detail(playlistId),
  );
  const renamePlaylist = useMutation(playlistMutations.rename);
  const deletePlaylist = useMutation(playlistMutations.delete);
  const deleteSongFromPlaylist = useMutation(
    playlistMutations.removeSongFromPlaylist,
  );

  if (isPending) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading playlist.</p>;

  const songs = data?.songs ?? [];

  const handleRename = (name: string) =>
    renamePlaylist.mutate({ id: playlistId, name });
  const handleDelete = (id: string) => {
    deletePlaylist.mutate(id, {
      onSuccess: () => navigate("/MyPlaylists", { replace: true }),
    });
  };

  const findSongToDelete = (id: string) =>
    setSongToDelete(songs.find((s) => s.id === id) ?? null);

  const handleDeleteConfirm = () =>
    deleteSongFromPlaylist.mutate({
      playlistId,
      songId: songToDelete!.id,
    });

  //TODO: implement song playback when clicking on a song in the playlist
  const handleClick = (id: string) => {
    console.log(`song with ${id} clicked!`);
  };

  return (
    <>
      <PlaylistHeader
        headerImage={headerImageUrl}
        headerName={data.name}
        metadata={
          <div className="list-inside list-disc">
            <li> {data.authorName}</li>
            <li> {songs.length} songs</li>
          </div>
        }
        onDelete={
          data.isOwner ? () => setIsDeletePlaylistModalOpen(true) : undefined
        }
        onRename={data.isOwner ? () => setIsRenameModalOpen(true) : undefined}
      />

      <div className="mt-16">
        <SongSection
          songs={songs}
          onDelete={data.isOwner ? findSongToDelete : undefined}
          onClick={handleClick}
          showAddedAt={data.isOwner}
        />
      </div>

      {songToDelete && (
        <ConfirmModal
          message={
            <>
              Remove <b>{songToDelete.title}</b> from playlist?
            </>
          }
          onClose={() => setSongToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete song"
        />
      )}

      {isRenameModalOpen && (
        <TextInputModal
          title="Rename playlist"
          placeholder="Playlist name"
          initialValue={data.name}
          onClose={() => setIsRenameModalOpen(false)}
          onSubmit={handleRename}
        />
      )}

      {isDeletePlaylistModalOpen && (
        <ConfirmModal
          message={
            <>
              Are you sure you want to delete <b>{data.name}</b>?
            </>
          }
          onClose={() => setIsDeletePlaylistModalOpen(false)}
          onConfirm={() => handleDelete(playlistId)}
          title="Delete playlist"
        />
      )}
    </>
  );
}
