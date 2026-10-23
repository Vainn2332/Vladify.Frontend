import type {
  AddSongToPlaylistDto,
  CreatePlaylistDto,
  DeleteSongFromPlaylistDto,
  Playlist,
  UpdatePlaylistDto,
} from "./playlist";
import type { PaginationParams } from "../dtos/paginationParams";
import type { PagedResult } from "../dtos/pagedResult";
import { apiClient as api } from "../apiClient";

export interface PlaylistRequests {
  add(dto: CreatePlaylistDto): Promise<Playlist>;
  addSongToPlaylist(dto: AddSongToPlaylistDto): Promise<Playlist>;
  getAll(
    params: PaginationParams,
    signal?: AbortSignal,
  ): Promise<PagedResult<Playlist>>;
  getById(id: string, signal?: AbortSignal): Promise<Playlist>;
  update(dto: UpdatePlaylistDto): Promise<Playlist>;
  deleteSongFromPlaylist(dto: DeleteSongFromPlaylistDto): Promise<Playlist>;
  delete(id: string): Promise<void>;
}

const defaultRoute = "/playlists";

export const playlistRequests: PlaylistRequests = {
  add: (dto) => api.post<Playlist>(defaultRoute, dto).then((r) => r.data),

  addSongToPlaylist: (dto) =>
    api
      .post<Playlist>(`${defaultRoute}/${dto.playlistId}/songs/${dto.songId}`)
      .then((r) => r.data),

  getAll: (params, signal) =>
    api
      .get<PagedResult<Playlist>>(defaultRoute, { params, signal })
      .then((r) => r.data),

  getById: (id, signal) =>
    api.get<Playlist>(`${defaultRoute}/${id}`, { signal }).then((r) => r.data),

  update: async (dto) => {
    const { id, ...body } = dto;
    const r = await api.put<Playlist>(`${defaultRoute}/${id}`, body);
    return r.data;
  },

  deleteSongFromPlaylist: (dto) =>
    api
      .delete<Playlist>(`${defaultRoute}/${dto.playlistId}/songs/${dto.songId}`)
      .then((r) => r.data),

  delete: (id) => api.delete<void>(`${defaultRoute}/${id}`).then(() => {}),
};
