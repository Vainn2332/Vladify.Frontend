import type { paginationParams } from "../dtos/paginationParams";

const PLAYLISTS_QUERY_KEY = "playlists";

export const playlistKeys = {
  all: [PLAYLISTS_QUERY_KEY] as const,
  lists: () => [...playlistKeys.all, "list"] as const,
  list: (params: paginationParams) =>
    [...playlistKeys.lists(), params] as const,
  details: () => [...playlistKeys.all, "detail"] as const,
  detail: (id: string) => [...playlistKeys.details(), id] as const,
};
