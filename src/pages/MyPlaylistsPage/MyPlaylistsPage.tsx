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

  const handleCreatePlaylist = (title: string) => {
    console.log("Created playlist:", title);
  };

  const renderEmptyState = () => {
    if (isLoading) {
      return <p className="text-secondary">Loading playlists...</p>;
    }

    if (error) {
      return (
        <div className="flex flex-col items-start gap-2">
          <p className="text-secondary">
            Could not load your playlists. {error.message}
          </p>
          <button
            type="button"
            onClick={reload}
            className="cursor-pointer rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-950 transition-all hover:bg-cyan-400"
          >
            Try again
          </button>
        </div>
      );
    }

    return <p className="text-secondary">You have no playlists yet.</p>;
  };

  return (
    <>
      <CardSection
        items={MY_PLAYLISTS}
        title="My playlists"
        linkTemplate={(item) => `/tracks/${item.id}`}
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
