import { useEffect, useState } from "react";
import {
  CardSection,
  type CardSectionItem,
} from "../../components/CardSection/CardSection";
import { CirclePlus } from "lucide-react";
import { CreatePlaylistModal } from "../../components/Modals/CreatePlaylistModal";
import { usePlaylistsService } from "../../api/services/usePlaylistsService";
import type { playlist } from "../../api/dtos/playlist";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    playlistsService
      .getAll()
      .then((data) => {
        if (!cancelled) setPlaylists(data);
      })
      .catch((error) => console.error("Failed to load playlists:", error));

    return () => {
      cancelled = true;
    };
  }, [playlistsService]);

  const handleCreatePlaylist = async (title: string) => {
    try {
      const created = await playlistsService.add({ name: title });
      setPlaylists((prev) => [...prev, created]);
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

      {isModalOpen && (
        <CreatePlaylistModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePlaylist}
        />
      )}
    </>
  );
}
