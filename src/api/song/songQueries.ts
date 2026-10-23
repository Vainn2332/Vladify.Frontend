import { queryOptions } from "@tanstack/react-query";
import { songKeys } from "./songKeys";
import type { PaginationParams } from "../dtos/paginationParams";
import { songRequests } from "./songRequests";

export const songQueries = {
  page: (params: PaginationParams) =>
    queryOptions({
      queryKey: songKeys.page(params),
      queryFn: ({ signal }) => songRequests.getAll(params, signal),
    }),

  detail: (songId: string) =>
    queryOptions({
      queryKey: songKeys.detail(songId),
      queryFn: ({ signal }) => songRequests.getById(songId, signal),
    }),
};
