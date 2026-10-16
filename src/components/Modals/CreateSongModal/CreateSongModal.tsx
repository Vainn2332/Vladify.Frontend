import { FileField } from "../Fields/FileField";
import { TextField } from "../Fields/TextField";
import { Modal } from "../Modal";

interface CreateSongModalProps {
  onClose: () => void;
}

export function CreateSongModal({ onClose }: CreateSongModalProps) {
  return (
    <Modal onClose={onClose} title="Create new song">
      <TextField title="Name" placeholder="Your song name" />

      <TextField title="Album" placeholder="Your album name" />

      <FileField
        title="AudioFile"
        accept="audio/*"
        placeholder="Your audio file"
        invalidTypeMessage="Only audio files are allowed"
      />

      <FileField
        title="CoverImage"
        accept="image/*"
        placeholder="Your cover image"
        invalidTypeMessage="Only images are allowed"
        preview
      />

      <div className="flex items-center justify-center gap-10">
        <button className="cursor-pointer rounded-2xl bg-cyan-500 px-4 text-white transition-colors hover:bg-cyan-400">
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
