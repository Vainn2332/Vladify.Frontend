import { useState } from "react";
import {
  CardSection,
  type CardSectionItem,
} from "../../components/CardSection/CardSection";
import { CirclePlus } from "lucide-react";
import { CreatePlaylistModal } from "../../components/Modals/CreatePlaylistModal";

const MY_PLAYLISTS: CardSectionItem[] = [
  {
    id: "playlist-1",
    title: "someTitle",
    imageUrl: "https://picsum.photos/seed/track10/300/300",
  },
];

export function MyPlaylistsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePlaylist = (title: string) => {
    console.log("Created playlist:", title);
  };

  return (
    <>
      <CardSection
        items={MY_PLAYLISTS}
        title="My playlists"
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
