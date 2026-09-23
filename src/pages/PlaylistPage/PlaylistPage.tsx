import { PlaylistHeader } from "../../components/PlaylistHeader/PlaylistHeader";

const data = {
  headerImage: "https://picsum.photos/seed/track2/300/300",
  headerName: "someHeader",
  metadata: "blablalba",
};

export function PlaylistPage() {
  return (
    <PlaylistHeader
      headerImage={data.headerImage}
      headerName={data.headerName}
      metadata={<li className="list-inside list-disc">{data.metadata}</li>}
    />
  );
}
