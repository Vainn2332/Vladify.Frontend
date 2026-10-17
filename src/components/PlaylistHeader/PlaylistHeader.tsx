import { Trash2 as DeleteIcon, SquarePen as RenameIcon } from "lucide-react";
import { IconButton } from "../Buttons/IconButton";

interface PlaylistHeaderProps {
  headerImage: string;
  headerName: string;
  metadata: React.ReactNode;
  onDelete?: () => void;
  onRename?: () => void;
}

export function PlaylistHeader({
  headerImage,
  headerName,
  metadata,
  onRename,
  onDelete,
}: PlaylistHeaderProps) {
  return (
    <div className="flex gap-5">
      <img
        src={headerImage}
        className="bg-app aspect-square max-w-30 rounded-lg border border-white sm:max-w-40"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      ></img>
      <div className="flex flex-col text-sm">
        <div className="flex gap-4">
          <h1 className="text-xl font-bold sm:text-2xl">{headerName}</h1>
          {onRename && (
            <IconButton
              icon={RenameIcon}
              onClick={onRename}
              aria-label="Rename playlist"
            />
          )}
        </div>
        {metadata}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="mt-auto mb-3 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-red-200 bg-red-100/50 px-4 py-1.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-300/50"
          >
            <DeleteIcon className="h-4 w-4" />
            Delete playlist
          </button>
        )}
      </div>
    </div>
  );
}
