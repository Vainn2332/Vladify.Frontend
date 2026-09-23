import { SquarePen as RenameIcon } from "lucide-react";
import { IconButton } from "../Buttons/IconButton";

interface PlaylistHeaderProps {
  headerImage: string;
  headerName: string;
  metadata: React.ReactNode;
}

export function PlaylistHeader({
  headerImage,
  headerName,
  metadata,
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
          <h1 className="text-2xl font-bold">{headerName}</h1>
          <IconButton icon={RenameIcon} />
        </div>
        <p>{metadata}</p>
      </div>
    </div>
  );
}
