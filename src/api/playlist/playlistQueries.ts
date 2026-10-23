import { queryOptions } from "@tanstack/react-query";
import type { PaginationParams } from "../dtos/paginationParams";
import { playlistRequests } from "./playlistRequests";
import { playlistKeys } from "./playlistKeys";

export const playlistQueries = {
  page: (params: PaginationParams) =>
    queryOptions({
      queryKey: playlistKeys.page(params),
      queryFn: ({ signal }) => playlistRequests.getAll(params, signal),
    }),

  detail: (playlistId: string) =>
    queryOptions({
      queryKey: playlistKeys.detail(playlistId),
      queryFn: ({ signal }) => playlistRequests.getById(playlistId, signal),
    }),
};
