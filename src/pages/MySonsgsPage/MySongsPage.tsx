import { useEffect, useState } from "react";
import type { Song } from "../../api/song/song";
import { useMutation } from "@tanstack/react-query";
import { PlaylistHeader } from "../../components/PlaylistHeader/PlaylistHeader";
import { HEADER_IMAGE_URL } from "../../constants/urls";
import { songRequests } from "../../api/song/songRequests";
import type { PaginationParams } from "../../api/dtos/paginationParams";
import type { PagedResult } from "../../api/dtos/pagedResult";

export function MySongsPage() {
  /*const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  
  const { data, isPending, isError } = useQuery(
    .detail(playlistId),
  );
    const deleteSong = useMutation(.delete);
  
  if (isPending) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading page.</p>;

    const songs = data?.songs ?? [];

    const findSongToDelete = (id: string) =>
    setSongToDelete(songs.find((s) => s.id === id) ?? null);
 
     //TODO: implement song playback when clicking on a song in the playlist
  const handleClick = (id: string) => {
    console.log(`song with ${id} clicked!`);
    }*/
  const [data, setData] = useState<Song[]>([]);
  useEffect(() => {
    const controller = new AbortController();

    const pagination: PaginationParams = {
      pageNumber: 1,
      pageSize: 5,
    };
    songRequests
      .getSongsOfAuthor(
        "8717FEF3-A26B-E361-CA4B-173B514B256B",
        pagination,
        controller.signal,
      )
      .then((response) => setData(response.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <PlaylistHeader
        headerImage={HEADER_IMAGE_URL}
        headerName="bla"
        metadata="ba"
      />
      {data.map((d) => {
        <p>{d?.album}</p>;
      })}
    </>
  );
}
