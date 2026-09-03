import {
  Pause as PauseIcon,
  SkipBack as SkipBackIcon,
  SkipForward as SkipForwardIcon,
  Volume1 as VolumeIcon,
} from "lucide-react";
import { IconButton } from "../../Buttons/IconButton";

export function Player() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 grid grid-cols-3 items-center bg-cyan-950 p-2 px-1 text-white sm:px-2">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="aspect-square w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-14">
          <img
            src="https://picsum.photos/seed/track4/300/300"
            alt="track logo"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="line-clamp-2 text-xs wrap-break-word sm:text-sm">
            Name of track
          </span>
          <span className="text-2xs line-clamp-2 wrap-break-word text-gray-400 sm:text-xs">
            author name
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-xl flex-col items-center justify-self-center px-1">
        <div className="flex items-center gap-4">
          <IconButton icon={SkipBackIcon} aria-label="Previous track" />
          <IconButton icon={PauseIcon} aria-label="Pause" />
          <IconButton icon={SkipForwardIcon} aria-label="Next track" />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          className="mt-4 h-0.75 w-full cursor-pointer appearance-none rounded bg-black/50 accent-white/80 hover:opacity-75"
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
        <VolumeIcon className="h-5 w-5 fill-current" />
        <input
          type="range"
          min="0"
          max="100"
          className="h-1 w-16 cursor-pointer appearance-none rounded bg-black/50 accent-white/80 hover:opacity-75 sm:block sm:w-20"
        />
      </div>
    </div>
  );
}
