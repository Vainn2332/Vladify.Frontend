import { useState } from "react";
import { PlaylistHeader } from "../../components/PlaylistHeader/PlaylistHeader";
import { SongSection } from "../../components/Sections/SongSection/SongSection";
import type { song } from "../../models/song";

const data = {
  headerImage: "https://picsum.photos/seed/track2/300/300",
  headerName: "someHeader",
  metadata: "blablalba",
};

const SONGS: song[] = [
  {
    id: "song-1",
    title: "Paralyzed",
    album: "Conquer Divide",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track1/300/300",
    duration: "02:00",
  },
  {
    id: "song-2",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
  },
  {
    id: "song-3",
    title: "I Amsafsssssssdszxv",
    author: "Влад Помозовфыв",
    coverUrl: "https://picsum.photos/seed/track3/300/300",
    album: "Hands like houses",
    duration: "03:40",
  },
  {
    id: "song-4",
    title: "Clarity",
    author: "Влад Помозов",
    coverUrl: "https://picsum.photos/seed/track4/300/300",
    album: "enmy",
    duration: "02:15",
  },
];

export function PlaylistPage() {
  const [songs, setSongs] = useState<song[]>(SONGS);

  const handleDelete = (id: string) =>
    setSongs((current) => current.filter((song) => song.id !== id));

  return (
    <>
      <PlaylistHeader
        headerImage={data.headerImage}
        headerName={data.headerName}
        metadata={<li className="list-inside list-disc">{data.metadata}</li>}
      />

      <div className="mt-20">
        <SongSection songs={songs} onDelete={handleDelete} showAddedAt={true} />
      </div>
    </>
  );
}
