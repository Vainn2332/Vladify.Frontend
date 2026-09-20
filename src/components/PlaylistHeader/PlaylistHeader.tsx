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
        className="bg-app aspect-square max-w-52 rounded-lg border border-white"
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
        {/*
        <ul className="list-inside list-disc">
          <li>{metadata}</li>
        </ul>
        */}
      </div>
    </div>
  );
}
