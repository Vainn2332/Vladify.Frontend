import type { paginationParams } from "../dtos/paginationParams";

const SONGS_QUERY_KEY = "songs";

export const songKeys = {
  all: () => [SONGS_QUERY_KEY] as const,
  list: () => [...songKeys.all(), "list"] as const,
  page: (params: paginationParams) => [...songKeys.list(), params] as const,
  details: () => [...songKeys.all(), "detail"] as const,
  detail: (id: string) => [...songKeys.details(), id] as const,
};
