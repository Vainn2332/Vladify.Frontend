import type { paginationParams } from "../dtos/paginationParams";

const PLAYLISTS_QUERY_KEY: string = "playlists";

export const playlistKeys = {
  all: () => [PLAYLISTS_QUERY_KEY] as const,
  list: () => [...playlistKeys.all(), "list"] as const,
  page: (params: paginationParams) => [...playlistKeys.list(), params] as const,
  details: () => [...playlistKeys.all(), "detail"] as const,
  detail: (id: string) => [...playlistKeys.details(), id] as const,
};
