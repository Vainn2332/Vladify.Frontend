import { queryOptions } from "@tanstack/react-query";
import type { paginationParams } from "../dtos/paginationParams";
import { playlistRequests } from "./playlistRequests";
import { playlistKeys } from "./playlistKeys";

export const playlistsQueryOptions = (params: paginationParams) =>
  queryOptions({
    queryKey: playlistKeys.list(params),
    queryFn: ({ signal }) => playlistRequests.getAll(params, signal),
  });

export const playlistQueryOptions = (playlistId: string) =>
  queryOptions({
    queryKey: playlistKeys.detail(playlistId),
    queryFn: ({ signal }) => playlistRequests.getById(playlistId, signal),
  });
