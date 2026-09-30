import { useState } from "react";
import { PlaylistHeader } from "../../components/PlaylistHeader/PlaylistHeader";
import { SongSection } from "../../components/Sections/SongSection/SongSection";
import type { song } from "../../api/dtos/song";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { Navigate, useParams } from "react-router-dom";

interface PlaylistPageContentProps {
  playlistId: string;
}

const data = {
  headerImage: "https://picsum.photos/seed/300/300",
  headerName: "someHeader",
};

const SONGS: song[] = [
  {
    id: "song-1",
    title: "Paralyzed",
    album: "Conquer Divide",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track1/300/300",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-2",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-3",
    title: "I Amsafsssssssdszxv",
    author: "Влад Помозовфыв",
    coverUrl: "https://picsum.photos/seed/track3/300/300",
    album: "Hands like houses",
    duration: "03:40",
    addedAt: "12422",
  },
  {
    id: "song-4",
    title: "Clarity",
    author: "Влад Помозов",
    coverUrl: "https://picsum.photos/seed/track4/300/300",
    album: "enmy",
    duration: "02:15",
  },
  {
    id: "song-20",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-21",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-22",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-23",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-24",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-25",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-26",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-268",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-269",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-261",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-262",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-32",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-52",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-42",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-82",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-292",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-242",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-222",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-111",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-78",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-67",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
  {
    id: "song-52",
    title: "Atonement",
    author: "Владислав",
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    album: "Conquer Divide",
    duration: "02:00",
    addedAt: "12422",
  },
];

export function PlaylistPage() {
  const { playlistId } = useParams<string>();

  if (!playlistId) return <Navigate to="/MyPlaylists" replace />;

  return <PlaylistPageContent key={playlistId} playlistId={playlistId} />;
}

//fetch logic will be added in next PR
function PlaylistPageContent({ playlistId }: PlaylistPageContentProps) {
  const [songs, setSongs] = useState<song[]>(SONGS);
  const [songToDelete, setSongToDelete] = useState<song | null>(null);

  const findSongToDelete = (id: string) =>
    setSongToDelete(songs.find((s) => s.id === id) ?? null);

  const handleDeleteConfirm = () =>
    setSongs((current) =>
      current.filter((song) => song.id !== songToDelete?.id),
    );

  return (
    <>
      <PlaylistHeader
        headerImage={data.headerImage}
        headerName={data.headerName}
        metadata={<li className="list-inside list-disc">{playlistId}</li>}
      />

      <div className="mt-16">
        <SongSection
          songs={songs}
          onDelete={findSongToDelete}
          showAddedAt={true}
        />
      </div>

      {songToDelete && (
        <ConfirmModal
          message={`Remove ${songToDelete.title} from playlist?`}
          onClose={() => setSongToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete song"
        />
      )}
    </>
  );
}
