import type { PaginationParams } from "../dtos/paginationParams";

const SONGS_QUERY_KEY = "songs";

export const songKeys = {
  all: () => [SONGS_QUERY_KEY] as const,
  list: () => [...songKeys.all(), "list"] as const,
  mySongs: (params: PaginationParams) =>
    [...songKeys.list(), "my", params] as const,
  userSongs: (authorId: string, params: PaginationParams) =>
    [...songKeys.list(), "user", authorId, params] as const,
  details: () => [...songKeys.all(), "detail"] as const,
  detail: (id: string) => [...songKeys.details(), id] as const,
};
