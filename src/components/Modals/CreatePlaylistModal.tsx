import { useState } from "react";
import { X } from "lucide-react";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export function CreatePlaylistModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePlaylistModalProps) {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(title.trim());
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 pb-28">
      <div className="w-full max-w-md rounded-xl bg-white/75 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-black/90">Create playlist</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-black/70"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Playlist name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="rounded-xl bg-cyan-900/50 px-4 py-2.5 text-white placeholder-gray-300 ring-1 ring-cyan-700/50 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-950 transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
