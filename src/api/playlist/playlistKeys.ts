import type { paginationParams } from "../dtos/paginationParams";

const PLAYLISTS_QUERY_KEY = "playlists";

export const playlistKeys = {
  all: [PLAYLISTS_QUERY_KEY] as const,
  list: () => [...playlistKeys.all, "list"] as const,
  page: (params: paginationParams) => [...playlistKeys.list(), params] as const,
  detail: (id: string) => [...playlistKeys.all, id] as const,
};
