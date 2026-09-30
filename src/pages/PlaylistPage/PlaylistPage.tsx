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
  headerImage: "https://picsum.photos/seed/late-night-drive/300/300",
  headerName: "Late Night Drive",
};

const SONGS: song[] = [
  {
    id: "song-1",
    title: "Paralyzed",
    album: "Conquer Divide",
    author: "Conquer Divide",
    authorId: 1,
    coverUrl: "https://picsum.photos/seed/track1/300/300",
    duration: "03:32",
    addedAt: "2026-06-02",
  },
  {
    id: "song-2",
    title: "Messages",
    album: "Conquer Divide",
    author: "Conquer Divide",
    authorId: 1,
    coverUrl: "https://picsum.photos/seed/track2/300/300",
    duration: "03:18",
    addedAt: "2026-06-02",
  },
  {
    id: "song-3",
    title: "I Am",
    album: "Dissonants",
    author: "Hands Like Houses",
    authorId: 2,
    coverUrl: "https://picsum.photos/seed/track3/300/300",
    duration: "03:25",
    addedAt: "2026-06-05",
  },
  {
    id: "song-4",
    title: "Colourblind",
    album: "Unimagine",
    author: "Hands Like Houses",
    authorId: 2,
    coverUrl: "https://picsum.photos/seed/track4/300/300",
    duration: "03:36",
    addedAt: "2026-06-09",
  },
  {
    id: "song-5",
    title: "Do I Wanna Know?",
    album: "AM",
    author: "Arctic Monkeys",
    authorId: 3,
    coverUrl: "https://picsum.photos/seed/track5/300/300",
    duration: "04:32",
    addedAt: "2026-06-14",
  },
  {
    id: "song-6",
    title: "R U Mine?",
    album: "AM",
    author: "Arctic Monkeys",
    authorId: 3,
    coverUrl: "https://picsum.photos/seed/track6/300/300",
    duration: "03:21",
    addedAt: "2026-06-14",
  },
  {
    id: "song-7",
    title: "505",
    album: "Favourite Worst Nightmare",
    author: "Arctic Monkeys",
    authorId: 3,
    coverUrl: "https://picsum.photos/seed/track7/300/300",
    duration: "04:13",
    addedAt: "2026-06-20",
  },
  {
    id: "song-8",
    title: "Weird Fishes/Arpeggi",
    album: "In Rainbows",
    author: "Radiohead",
    authorId: 4,
    coverUrl: "https://picsum.photos/seed/track8/300/300",
    duration: "05:18",
    addedAt: "2026-06-27",
  },
  {
    id: "song-9",
    title: "Karma Police",
    album: "OK Computer",
    author: "Radiohead",
    authorId: 4,
    coverUrl: "https://picsum.photos/seed/track9/300/300",
    duration: "04:24",
    addedAt: "2026-07-01",
  },
  {
    id: "song-10",
    title: "Instant Crush",
    album: "Random Access Memories",
    author: "Daft Punk",
    authorId: 5,
    coverUrl: "https://picsum.photos/seed/track10/300/300",
    duration: "05:37",
    addedAt: "2026-07-04",
  },
  {
    id: "song-11",
    title: "Digital Love",
    album: "Discovery",
    author: "Daft Punk",
    authorId: 5,
    coverUrl: "https://picsum.photos/seed/track11/300/300",
    duration: "04:58",
    addedAt: "2026-07-04",
  },
  {
    id: "song-12",
    title: "The Less I Know the Better",
    album: "Currents",
    author: "Tame Impala",
    authorId: 6,
    coverUrl: "https://picsum.photos/seed/track12/300/300",
    duration: "03:36",
    addedAt: "2026-07-11",
  },
  {
    id: "song-13",
    title: "Let It Happen",
    album: "Currents",
    author: "Tame Impala",
    authorId: 6,
    coverUrl: "https://picsum.photos/seed/track13/300/300",
    duration: "07:47",
    addedAt: "2026-07-15",
  },
  {
    id: "song-14",
    title: "Dreams",
    album: "Rumours",
    author: "Fleetwood Mac",
    authorId: 7,
    coverUrl: "https://picsum.photos/seed/track14/300/300",
    duration: "04:14",
    addedAt: "2026-07-19",
  },
  {
    id: "song-15",
    title: "HUMBLE.",
    album: "DAMN.",
    author: "Kendrick Lamar",
    authorId: 8,
    coverUrl: "https://picsum.photos/seed/track15/300/300",
    duration: "02:57",
    addedAt: "2026-07-23",
  },
  {
    id: "song-16",
    title: "Happier Than Ever",
    album: "Happier Than Ever",
    author: "Billie Eilish",
    authorId: 9,
    coverUrl: "https://picsum.photos/seed/track16/300/300",
    duration: "04:58",
    addedAt: "2026-07-30",
  },
  {
    id: "song-17",
    title: "Can You Feel My Heart",
    album: "Sempiternal",
    author: "Bring Me The Horizon",
    authorId: 10,
    coverUrl: "https://picsum.photos/seed/track17/300/300",
    duration: "04:00",
    addedAt: "2026-08-03",
  },
  {
    id: "song-18",
    title: "Drown",
    album: "That's the Spirit",
    author: "Bring Me The Horizon",
    authorId: 10,
    coverUrl: "https://picsum.photos/seed/track18/300/300",
    duration: "03:42",
    addedAt: "2026-08-03",
  },
  {
    id: "song-19",
    title: "Come As You Are",
    album: "Nevermind",
    author: "Nirvana",
    authorId: 11,
    coverUrl: "https://picsum.photos/seed/track19/300/300",
    duration: "03:39",
    addedAt: "2026-08-10",
  },
  {
    id: "song-20",
    title: "Blinding Lights",
    album: "After Hours",
    author: "The Weeknd",
    authorId: 12,
    coverUrl: "https://picsum.photos/seed/track20/300/300",
    duration: "03:20",
    addedAt: "2026-08-16",
  },
  {
    id: "song-21",
    title: "Teardrop",
    album: "Mezzanine",
    author: "Massive Attack",
    authorId: 13,
    coverUrl: "https://picsum.photos/seed/track21/300/300",
    duration: "05:29",
    addedAt: "2026-08-21",
  },
  {
    id: "song-22",
    title: "Dog Days Are Over",
    album: "Lungs",
    author: "Florence + The Machine",
    authorId: 14,
    coverUrl: "https://picsum.photos/seed/track22/300/300",
    duration: "04:12",
    addedAt: "2026-08-28",
  },
  {
    id: "song-23",
    title: "I Write Sins Not Tragedies",
    album: "A Fever You Can't Sweat Out",
    author: "Panic! At The Disco",
    authorId: 15,
    coverUrl: "https://picsum.photos/seed/track23/300/300",
    duration: "03:06",
    addedAt: "2026-09-04",
  },
  {
    id: "song-24",
    title: "This Ain't a Scene, It's an Arms Race",
    album: "Infinity on High",
    author: "Fall Out Boy",
    authorId: 16,
    coverUrl: "https://picsum.photos/seed/track24/300/300",
    duration: "03:32",
    addedAt: "2026-09-12",
  },
  {
    id: "song-25",
    title: "Storm",
    album: "Lift Your Skinny Fists Like Antennas to Heaven",
    author: "Godspeed You! Black Emperor",
    authorId: 17,
    coverUrl: "https://picsum.photos/seed/track25/300/300",
    duration: "22:32",
    addedAt: "2026-09-19",
  },
  {
    id: "song-26",
    title: "Bohemian Rhapsody",
    album: "A Night at the Opera",
    author: "Queen",
    authorId: 18,
    coverUrl: "https://picsum.photos/seed/track26/300/300",
    duration: "05:55",
    addedAt: "2026-09-27",
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
