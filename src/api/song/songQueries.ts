import { queryOptions } from "@tanstack/react-query";
import { songKeys } from "./songKeys";
import type { PaginationParams } from "../dtos/paginationParams";
import { songRequests } from "./songRequests";

export const songQueries = {
  mySongs: (params: PaginationParams) =>
    queryOptions({
      queryKey: songKeys.mySongs(params),
      queryFn: ({ signal }) => songRequests.getAll(params, signal),
    }),

  userSongs: (params: PaginationParams, authorId: string) =>
    queryOptions({
      queryKey: songKeys.userSongs(authorId, params),
      queryFn: ({ signal }) =>
        songRequests.getSongsOfAuthor(authorId, params, signal),
    }),

  detail: (songId: string) =>
    queryOptions({
      queryKey: songKeys.detail(songId),
      queryFn: ({ signal }) => songRequests.getById(songId, signal),
    }),
};
