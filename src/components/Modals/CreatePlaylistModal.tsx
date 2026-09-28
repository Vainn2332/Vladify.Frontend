import { useState } from "react";
import { Modal } from "./Modal";

interface CreatePlaylistModalProps {
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export function CreatePlaylistModal({
  onClose,
  onSubmit,
}: CreatePlaylistModalProps) {
  const [playlistTitle, setPlaylistTitle] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(playlistTitle.trim());
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Create playlist">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Playlist name"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          autoFocus
          className="rounded-xl bg-cyan-900/50 px-4 py-2.5 text-white placeholder-gray-300 ring-1 ring-cyan-700/50 outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            disabled={!playlistTitle.trim()}
            className="cursor-pointer rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-950 transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
