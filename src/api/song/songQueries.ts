import { queryOptions } from "@tanstack/react-query";
import { songKeys } from "./songKeys";
import type { PaginationParams } from "../dtos/paginationParams";
import { songRequests } from "./songRequests";

export const songQueries = {
  recentSongs: (params: PaginationParams) =>
    queryOptions({
      queryKey: songKeys.recent(params),
      queryFn: ({ signal }) => songRequests.getAll(params, signal),
    }),

  userSongs: (params: PaginationParams, authorId: string) =>
    queryOptions({
      queryKey: songKeys.userSongs(params, authorId),
      queryFn: ({ signal }) =>
        songRequests.getSongsOfAuthor(authorId, params, signal),
    }),

  detail: (songId: string) =>
    queryOptions({
      queryKey: songKeys.detail(songId),
      queryFn: ({ signal }) => songRequests.getById(songId, signal),
    }),
};
