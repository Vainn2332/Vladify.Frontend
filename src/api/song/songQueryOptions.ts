import { queryOptions } from "@tanstack/react-query";
import { songKeys } from "./songKeys";
import type { paginationParams } from "../dtos/paginationParams";
import { songRequests } from "./songRequests";

export const songQueries = {
  list: (params: paginationParams) =>
    queryOptions({
      queryKey: songKeys.list(params),
      queryFn: ({ signal }) => songRequests.getAll(params, signal),
    }),

  detail: (songId: string) =>
    queryOptions({
      queryKey: songKeys.detail(songId),
      queryFn: ({ signal }) => songRequests.getById(songId, signal),
    }),
};
