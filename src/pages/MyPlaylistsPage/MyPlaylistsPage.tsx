import { useState } from "react";
import {
  CardSection,
  type CardSectionItem,
} from "../../components/CardSection/CardSection";
import { CirclePlus } from "lucide-react";
import { CreatePlaylistModal } from "../../components/Modals/CreatePlaylistModal";
import { usePlaylists } from "../../hooks/usePlaylists";
import type { Playlist } from "../../api/types";
import {
  PLAYLISTS_PAGE_NUMBER,
  PLAYLISTS_PAGE_SIZE,
} from "./MyPlaylistsPage.constants";

// The API carries no cover image, so the card falls back to its gradient.
function toCardSectionItem(playlist: Playlist): CardSectionItem {
  return {
    id: playlist.id,
    title: playlist.name,
    subtitle: playlist.authorName,
  };
}

export function MyPlaylistsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playlists, isLoading, error, reload } = usePlaylists({
    pageNumber: PLAYLISTS_PAGE_NUMBER,
    pageSize: PLAYLISTS_PAGE_SIZE,
  });

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
        items={playlists.map(toCardSectionItem)}
        title="My playlists"
        linkTemplate={(item) => `/tracks/${item.id}`}
        emptyState={renderEmptyState()}
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

      {isModalOpen && (
        <CreatePlaylistModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePlaylist}
        />
      )}
    </>
  );
}
