import { queryOptions } from "@tanstack/react-query";
import type { paginationParams } from "../dtos/paginationParams";
import { playlistRequests } from "./playlistRequests";
import { playlistKeys } from "./playlistKeys";

export const playlistQueries = {
  list: (params: paginationParams) =>
    queryOptions({
      queryKey: playlistKeys.list(params),
      queryFn: ({ signal }) => playlistRequests.getAll(params, signal),
    }),

  detail: (playlistId: string) =>
    queryOptions({
      queryKey: playlistKeys.detail(playlistId),
      queryFn: ({ signal }) => playlistRequests.getById(playlistId, signal),
    }),
};
