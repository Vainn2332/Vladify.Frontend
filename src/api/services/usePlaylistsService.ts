import { useMemo } from "react";
import { useApiClient } from "../useApiClient";
import type {
  addSongToPlaylistDto,
  createPlaylistDto,
  deleteSongFromPlaylistDto,
  playlist,
  updatePlaylistDto,
} from "../dtos/playlist";
import type { paginationParams } from "../dtos/paginationParams";
import type { pagedResult } from "../dtos/pagedResult";

export interface PlaylistsService {
  add(dto: createPlaylistDto): Promise<playlist>;
  addSongToPlaylist(dto: addSongToPlaylistDto): Promise<playlist>;
  getAll(params: paginationParams): Promise<pagedResult<playlist>>;
  getById(id: string): Promise<playlist>;
  update(dto: updatePlaylistDto): Promise<playlist>;
  deleteSongFromPlaylist(dto: deleteSongFromPlaylistDto): Promise<playlist>;
  delete(id: string): Promise<void>;
}

const defaultRoute = "/playlists";

export function usePlaylistsService(): PlaylistsService {
  const api = useApiClient();

  return useMemo(
    () => ({
      add: (dto) => api.post<playlist>(defaultRoute, dto).then((r) => r.data),

      addSongToPlaylist: (dto) =>
        api
          .post<playlist>(
            `${defaultRoute}/${dto.playlistId}/songs/${dto.songId}`,
          )
          .then((r) => r.data),

      getAll: (params) =>
        api
          .get<pagedResult<playlist>>(defaultRoute, { params })
          .then((r) => r.data),

      getById: (id) =>
        api.get<playlist>(`${defaultRoute}/${id}`).then((r) => r.data),

      update: async (dto) => {
        const { id, ...body } = dto;
        const r = await api.put<playlist>(`${defaultRoute}/${id}`, body);
        return r.data;
      },

      deleteSongFromPlaylist: (dto) =>
        api
          .delete<playlist>(
            `${defaultRoute}/${dto.playlistId}/songs/${dto.songId}`,
          )
          .then((r) => r.data),

      delete: (id) => api.delete<void>(`${defaultRoute}/${id}`).then(() => {}),
    }),
    [api],
  );
}
