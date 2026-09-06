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
import { usePageSize } from "./usePageSize";

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
  const pageSize = usePageSize();
  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevPageSize, setPrevPageSize] = useState(pageSize);

  // A different page size means the current page number no longer maps to the
  // same items, so restart from the first page when the breakpoint changes.
  // React's recommended "adjust state during render" pattern, not an effect.
  if (pageSize !== prevPageSize) {
    setPrevPageSize(pageSize);
    setPageNumber(1);
  }

  useEffect(() => {
    let cancelled = false;

    playlistsService
      .getAll({ pageNumber, pageSize })
      .then((data) => {
        if (cancelled) return;
        setPlaylists(data);
        setHasMore(data.length === pageSize);
      })
      .catch((error) => console.error("Failed to load playlists:", error));

    return () => {
      cancelled = true;
    };
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

      {(pageNumber > 1 || hasMore) && (
        <div className="mt-auto mb-20">
          <Pagination
            pageNumber={pageNumber}
            hasMore={hasMore}
            onNextPage={() => setPageNumber((page) => page + 1)}
            onPrevPage={() => setPageNumber((page) => page - 1)}
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
