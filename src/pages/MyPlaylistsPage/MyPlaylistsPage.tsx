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
import { usePagination } from "./usePagination";

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
  const {
    pageNumber,
    pageSize,
    hasNextPage,
    goToNextPage,
    goToPrevPage,
    reportLoadedCount,
  } = usePagination();
  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [reloadToken, setReloadToken] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    playlistsService
      .getAll({ pageNumber, pageSize })
      .then((data) => {
        if (cancelled) return;
        setPlaylists(data);
        reportLoadedCount(data.length);
      })
      .catch((error) => console.error("Failed to load playlists:", error));
    return () => {
      cancelled = true;
    };
  }, [playlistsService, pageNumber, pageSize, reloadToken, reportLoadedCount]);

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
        placeholder={<p className="text-primary">Create your first playlist</p>}
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
