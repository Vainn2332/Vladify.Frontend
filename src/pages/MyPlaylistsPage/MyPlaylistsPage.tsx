import { useEffect, useState } from "react";
import {
  CardSection,
  type CardSectionItem,
} from "../../components/CardSection/CardSection";
import { CirclePlus } from "lucide-react";
import { CreatePlaylistModal } from "../../components/Modals/CreatePlaylistModal";
import { usePlaylistsService } from "../../api/services/usePlaylistsService";
import type { playlist } from "../../api/dtos/playlist";
import { Pagination } from "../../components/Pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";

function toCardItem(playlist: playlist): CardSectionItem {
  return {
    id: playlist.id,
    title: playlist.name,
    subtitle: playlist.authorName,
    imageUrl: `https://picsum.photos/seed/${playlist.id}/300/300`,
  };
}

export function MyPlaylistsPage() {
  const playlistsService = usePlaylistsService();
  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadToken, setReloadToken] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pageNumber, pageSize, goToNextPage, goToPrevPage } = usePagination();
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);

    playlistsService
      .getAll({ pageNumber, pageSize })
      .then((response) => {
        setPlaylists(response.data);
        setHasNextPage(response.hasNextPage);
        setIsLoading(false);
      })
      .catch((error) => {
        if (abortController.signal.aborted) {
          console.error("Failed to load playlists:", error);
          setIsLoading(false);
        }
      });

    return () => abortController.abort();
  }, [playlistsService, pageNumber, pageSize, reloadToken]);

  const handleCreatePlaylist = async (title: string) => {
    try {
      await playlistsService.add({ name: title });
      setReloadToken((token) => token + 1);
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  return (
    <>
      <CardSection
        items={playlists.map(toCardItem)}
        title="My playlists"
        linkTemplate={(item) => `/tracks/${item.id}`}
        placeholder={
          <p className="text-primary">
            {isLoading ? "Loading…" : "Create your first playlist"}
          </p>
        }
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
            isLoading={isLoading}
          />
        </div>
      )}

      {isModalOpen && (
        <CreatePlaylistModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePlaylist}
        />
      )}
    </>
  );
}
