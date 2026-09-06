import { useMemo } from "react";
import { useApiClient } from "../useApiClient";
import type { CreatePlaylistDto, playlist } from "../dtos/playlist";
import type { PaginationParams } from "../dtos/paginationParams";

export interface PlaylistsService {
  getAll(params: PaginationParams): Promise<playlist[]>;
  getById(id: string): Promise<playlist>;
  add(dto: CreatePlaylistDto): Promise<playlist>;
  delete(id: string): Promise<void>;
}

export function usePlaylistsService(): PlaylistsService {
  const api = useApiClient();

  return useMemo(
    () => ({
      getAll: (params) =>
        api.get<playlist[]>("/playlists", { params }).then((r) => r.data),

      getById: (id) =>
        api.get<playlist>(`/playlists/${id}`).then((r) => r.data),

      add: (dto) => api.post<playlist>("/playlists", dto).then((r) => r.data),

      delete: (id) => api.delete<void>(`/playlists/${id}`).then((r) => r.data),
    }),
    [api],
  );
}
