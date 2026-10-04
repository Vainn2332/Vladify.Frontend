import { queryOptions } from "@tanstack/react-query";
import type { paginationParams } from "../dtos/paginationParams";
import { PLAYLISTS_QUERY_KEY } from "../queryKeys/queryKeyConstants";
import { playlistRequests } from "./playlistRequests";

export const playlistsQueryOptions = (params: paginationParams) =>
  queryOptions({
    queryKey: [PLAYLISTS_QUERY_KEY, params],
    queryFn: ({ signal }) => playlistRequests.getAll(params, signal),
  });

export const playlistQueryOptions = (playlistId: string) =>
  queryOptions({
    queryKey: [PLAYLISTS_QUERY_KEY, playlistId],
    queryFn: ({ signal }) => playlistRequests.getById(playlistId, signal),
  });
