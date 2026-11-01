import { useState } from "react";
import type { AddSongDto, Song } from "../../api/song/song";
import { PlaylistHeader } from "../../components/PlaylistHeader/PlaylistHeader";
import { HEADER_IMAGE_URL } from "../../constants/urls";
import { songQueries } from "../../api/song/songQueries";
import { usePagination } from "../../hooks/usePagination";
import { songMutations } from "../../api/song/songMutations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SongSection } from "../../components/Sections/SongSection/SongSection";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { CreateSongModal } from "../../components/Modals/CreateSongModal/CreateSongModal";

export function MySongsPage() {
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const [isCreateSongModalOpen, setIsCreateSongModalOpen] = useState(false);
  const { pageNumber, pageSize } = usePagination();

  const {
    data: response,
    isPending,
    isError,
  } = useQuery(songQueries.mySongs({ pageNumber, pageSize }));
  const deleteSong = useMutation(songMutations.delete);
  const createSong = useMutation(songMutations.create);

  const handleDeleteSong = () =>
    deleteSong.mutate(songToDelete!.id, {
      onError: (error) => console.error("Failed to delete song", error),
    });
  const handleCreateSong = (dto: AddSongDto) =>
    createSong.mutate(dto, {
      onError: (error) => console.error("Failed to create song", error),
    });

  if (isPending) return <p>Loading...</p>;
  if (isError || !response) return <p>Error loading page.</p>;

  const songs = response.data ?? [];

  const findSongToDelete = (id: string) =>
    setSongToDelete(songs.find((s) => s.id === id) ?? null);

  //TODO: implement song playback when clicking on a song in the playlist
  const handleClick = (id: string) => {
    console.log(`song with ${id} clicked!`);
  };

  const isAuthor = songs[0]?.isAuthor ?? false;

  return (
    <>
      <div className="flex flex-col gap-4">
        <PlaylistHeader
          headerImage={HEADER_IMAGE_URL}
          headerName="My songs"
          metadata={
            <div className="list-inside list-disc">
              <li> {songs.length} songs</li>
            </div>
          }
        />
        <button
          className="mr-10 cursor-pointer self-end rounded-xl bg-green-500/80 px-6 py-2 text-sm font-semibold transition-colors hover:bg-green-400/80"
          onClick={() => setIsCreateSongModalOpen(true)}
        >
          Create new song
        </button>
        <SongSection
          songs={songs}
          onDelete={isAuthor ? findSongToDelete : undefined}
          onClick={handleClick}
          showAddedAt={isAuthor}
        />
      </div>
      {isCreateSongModalOpen && (
        <CreateSongModal
          onClose={() => setIsCreateSongModalOpen(false)}
          onConfirm={handleCreateSong}
        />
      )}

      {songToDelete && (
        <ConfirmModal
          message={
            <>
              Remove <b>{songToDelete.title}</b> from playlist?
            </>
          }
          onClose={() => setSongToDelete(null)}
          onConfirm={handleDeleteSong}
          title="Delete song"
        />
      )}
    </>
  );
}
