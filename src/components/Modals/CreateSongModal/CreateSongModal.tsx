import { FileField } from "../Fields/FileField";
import { TextField } from "../Fields/TextField";
import { Modal } from "../Modal";

interface CreateSongModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function CreateSongModal({ onClose, onConfirm }: CreateSongModalProps) {
  return (
    <Modal onClose={onClose} title="Create new song">
      <TextField title="Name" placeholder="Your song name" />

      <TextField title="Album" placeholder="Your album name" />

      <FileField
        title="AudioFile"
        accept="audio/*"
        placeholder="Your audio file"
      />

      <FileField
        title="CoverImage"
        accept="image/*"
        placeholder="Your cover image"
      />

      <div className="flex items-center justify-center gap-10">
        <button
          onClick={onConfirm}
          className="cursor-pointer rounded-2xl bg-cyan-300 px-4 shadow-md transition-colors hover:bg-cyan-400/85"
        >
          confirm
        </button>
        <button
          className="cursor-pointer rounded-2xl bg-black/10 px-4 transition-colors hover:bg-black/20"
          onClick={onClose}
        >
          cancel
        </button>
      </div>
    </Modal>
  );
}
