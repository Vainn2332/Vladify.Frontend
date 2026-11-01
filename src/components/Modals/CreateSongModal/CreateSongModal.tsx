import { useState } from "react";
import type { AddSongDto } from "../../../api/song/song";
import {
  AUDIO_EXTENSIONS,
  COVER_IMAGE_EXTENSIONS,
} from "../../../constants/fileExtensions";
import { FileField } from "../Fields/FileField";
import { TextField } from "../Fields/TextField";
import { Modal } from "../Modal";

interface CreateSongModalProps {
  onClose: () => void;
  onConfirm: (dto: AddSongDto) => void;
}

//TODO: add useStateS and call onConfirm
export function CreateSongModal({ onClose, onConfirm }: CreateSongModalProps) {
  const [songName, setSongName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const trimmedSongName = songName.trim();
  const trimmedAlbumName = albumName.trim();

  const isInvalid =
    !trimmedAlbumName || !trimmedSongName || !audioFile || !coverImage;
  const handleConfirm = () => {
    if (isInvalid) return;

    onConfirm({
      title: songName,
      album: albumName,
      audioFile,
      coverImage,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Create new song">
      <TextField
        title="Name"
        placeholder="Your song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />

      <TextField
        title="Album"
        placeholder="Your album name"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />

      <FileField
        title="AudioFile"
        allowedExtensions={AUDIO_EXTENSIONS}
        placeholder="Your audio file"
        onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
      />

      <FileField
        title="CoverImage"
        allowedExtensions={COVER_IMAGE_EXTENSIONS}
        placeholder="Your cover image"
        onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
      />

      <div className="flex items-center justify-center gap-10">
        <button
          onClick={handleConfirm}
          disabled={isInvalid}
          className="cursor-pointer rounded-2xl bg-cyan-500 px-4 text-white shadow-md transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirm
        </button>
        <button
          className="cursor-pointer rounded-2xl bg-black/10 px-4 shadow-md transition-colors hover:bg-black/20"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
