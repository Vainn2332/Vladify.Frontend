import { apiRequest } from "./client";
import type { PageParams, Playlist } from "./types";

interface GetPlaylistsOptions extends PageParams {
  token?: string;
  signal?: AbortSignal;
}

/** GET /api/playlists — paged list of playlists. Requires an access token. */
export function getPlaylists({
  pageNumber,
  pageSize,
  token,
  signal,
}: GetPlaylistsOptions = {}) {
  return apiRequest<Playlist[]>("/api/playlists", {
    token,
    signal,
    query: { PageNumber: pageNumber, PageSize: pageSize },
  });
}
