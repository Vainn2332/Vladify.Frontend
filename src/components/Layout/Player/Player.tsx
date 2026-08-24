import { Pause, SkipBack, SkipForward, Volume1 } from "lucide-react";

export function Player() {
  return (
    <div className="flex bg-cyan-950 text-sm md:text-base lg:text-2xl">
      <div className="flex w-1/4 flex-col p-2">
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <img
            src="https://picsum.photos/seed/track4/300/300"
            alt="track logo"
            className="aspect-square"
          ></img>
        </div>
        <div className="mt-2 text-white">
          <Volume1 className="fill-current" />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          className="mt-1 h-1.5 appearance-none bg-black/50 accent-white/80"
        ></input>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2">
        <div className="text-white">name of track</div>
        <div className="flex justify-center gap-3 text-white">
          <SkipBack className="fill-current" />
          <Pause />
          <SkipForward className="fill-current" />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          className="mt-3 h-1.5 appearance-none bg-black/50 accent-white/80"
        ></input>
      </div>
    </div>
  );
}
