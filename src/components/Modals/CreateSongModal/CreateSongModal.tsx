import { Modal } from "../Modal";

interface CreateSongModalProps {
  onClose: () => void;
}

export function CreateSongModal({ onClose }: CreateSongModalProps) {
  return (
    <Modal onClose={onClose} title="Create new song">
      <div className="text-sm">Name of song</div>
      <input
        type="text"
        placeholder="Your song name"
        className="mb-4 rounded-lg bg-gray-200 px-2"
      ></input>

      <div className="text-sm">Album</div>
      <input
        type="text"
        placeholder="Your album name"
        className="mb-4 rounded-lg bg-gray-200 px-2"
      ></input>

      <div className="text-sm font-bold">AudioFile</div>
      <input type="file" className="hidden" id="file-upload"></input>
      <label
        htmlFor="file-upload"
        className="mb-4 flex h-20 max-w-sm cursor-pointer items-center justify-center rounded-xl border-2 border-dashed bg-gray-300 text-black/70 hover:bg-gray-300/80"
      >
        Your audioFile
      </label>

      <div className="text-sm font-bold">CoverImage</div>
      <input type="file" className="hidden" id="cover-upload"></input>
      <label
        htmlFor="cover-upload"
        className="mb-4 flex h-20 max-w-sm cursor-pointer items-center justify-center rounded-xl border-2 border-dashed bg-gray-300 text-black/70 hover:bg-gray-300/80"
      >
        Your coverImage
      </label>

      <div className="flex items-center justify-center gap-10">
        <button className="cursor-pointer rounded-2xl bg-green-500 px-2 hover:bg-green-500/80">
          confirm
        </button>
        <button className="cursor-pointer rounded-2xl bg-red-500 px-2 hover:bg-red-500/80">
          cancel
        </button>
      </div>
    </Modal>
  );
}
