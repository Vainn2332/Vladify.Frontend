import type { paginationParams } from "../dtos/paginationParams";

const SONGS_QUERY_KEY = "songs";

export const songKeys = {
  all: [SONGS_QUERY_KEY] as const,
  lists: () => [...songKeys.all, "list"] as const,
  list: (params: paginationParams) => [...songKeys.lists(), params] as const,
  details: () => [...songKeys.all, "detail"] as const,
  detail: (id: string) => [...songKeys.details(), id] as const,
};
