import { useState } from "react";
import {
  CardSection,
  type CardSectionItem,
} from "../../components/Sections/CardSection/CardSection";
import { CirclePlus } from "lucide-react";
import { TextInputModal } from "../../components/Modals/TextInputModal";
import type { playlist } from "../../api/playlist/playlist";
import { Pagination } from "../../components/Pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { playlistQueries } from "../../api/playlist/playlistQueries";
import { playlistMutations } from "../../api/playlist/playlistMutations";

function toCardItem(playlist: playlist): CardSectionItem {
  return {
    id: playlist.id,
    title: playlist.name,
    subtitle: playlist.authorName,
    imageUrl: `https://picsum.photos/seed/${playlist.id}/300/300`,
  };
}

export function MyPlaylistsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pageNumber, pageSize, goToNextPage, goToPrevPage } = usePagination();
  const {
    data: response,
    isPending,
    isError,
  } = useQuery(playlistQueries.page({ pageNumber, pageSize }));
  const createPlaylist = useMutation(playlistMutations.create);

  const handleCreatePlaylist = async (title: string) => {
    try {
      await createPlaylist.mutateAsync({ name: title });
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  const playlists = response?.data ?? [];
  const hasNextPage = response?.hasNextPage ?? false;

  const placeholderText = isPending
    ? "Loading…"
    : isError
      ? "Failed to load playlists"
      : "Create your first playlist";

  return (
    <>
      <CardSection
        items={playlists.map(toCardItem)}
        title="My playlists"
        linkTemplate={(item) => `/playlists/${item.id}`}
        placeholder={<p className="text-primary">{placeholderText}</p>}
        action={
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer hover:opacity-90"
          >
            <CirclePlus className="size-10 fill-[#e2e8f0] stroke-black" />
          </button>
        }
      />

      {(pageNumber > 1 || hasNextPage) && (
        <div className="mt-auto mb-20">
          <Pagination
            pageNumber={pageNumber}
            hasNextPage={hasNextPage}
            onNextPage={() => goToNextPage()}
            onPrevPage={() => goToPrevPage()}
            isLoading={isPending}
          />
        </div>
      )}

      {isModalOpen && (
        <TextInputModal
          title="Create playlist"
          placeholder="Playlist name"
          submitLabel="Create"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePlaylist}
        />
      )}
    </>
  );
}
