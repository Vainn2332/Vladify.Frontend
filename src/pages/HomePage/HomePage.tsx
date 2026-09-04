import {
  CardSection,
  type CardSectionItem,
} from "../../components/CardSection/CardSection";

const NEW_SONGS: CardSectionItem[] = [
  {
    id: "track-2",
    title:
      "Очень длинное название трека  текста с троеточием которое обрезается и не помещается в одну строку",
    subtitle: "Известный Исполнитель",
    imageUrl: "https://picsum.photos/seed/track2/300/300",
  },
  {
    id: "track-3",
    title: "Starboy",
    subtitle: "The Weeknd, Daft Punk",
    imageUrl: "https://picsum.photos/seed/track3/300/300",
  },
  {
    id: "track-4",
    title: "Blinding Lights",
    subtitle: "The Weeknd",
    imageUrl: "https://picsum.photos/seed/track4/300/300",
  },
  {
    id: "track-5",
    title: "Blinding Lights",
    subtitle: "The Weeknd",
    imageUrl: "https://picsum.photos/seed/track4/300/300",
  },
  {
    id: "track-6",
    title: "Blinding Lights",
    subtitle: "The Weeknd",
    imageUrl: "https://picsum.photos/seed/track6/300/300",
  },
];
const PLAYLISTS: CardSectionItem[] = [
  {
    id: "playlist-1",
    title: "Chill Vibes",
    subtitle: "Relaxing tunes for your day",
    imageUrl: "https://picsum.photos/seed/playlist1/300/300",
  },
  {
    id: "playlist-2",
    title: "Workout Hits",
    subtitle: "Get pumped with these tracks",
    imageUrl: "https://picsum.photos/seed/playlist2/300/300",
  },
];

export function HomePage() {
  return (
    <>
      <CardSection
        title="New Songs"
        items={NEW_SONGS}
        linkTemplate={(item) => `/tracks/${item.id}`}
      />

      <CardSection title="My Playlists" items={PLAYLISTS} />
    </>
  );
}
