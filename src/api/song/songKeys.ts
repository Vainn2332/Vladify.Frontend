import type { PaginationParams } from "../dtos/paginationParams";

const SONGS_QUERY_KEY = "songs";

export const songKeys = {
  all: () => [SONGS_QUERY_KEY] as const,
  list: () => [...songKeys.all(), "list"] as const,
  recent: (params: PaginationParams) =>
    [...songKeys.list(), "recent", params] as const,
  userSongs: (params: PaginationParams, authorId: string) =>
    [...songKeys.list(), authorId, params] as const,
  details: () => [...songKeys.all(), "detail"] as const,
  detail: (id: string) => [...songKeys.details(), id] as const,
};
