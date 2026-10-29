import { apiClient as api } from "../apiClient";
import type { AddSongDto, Song, UpdateSongDto } from "./song";
import type { PaginationParams } from "../dtos/paginationParams";
import type { PagedResult } from "../dtos/pagedResult";

export interface SongRequests {
  add(dto: AddSongDto): Promise<Song>;
  getAll(
    params: PaginationParams,
    signal?: AbortSignal,
  ): Promise<PagedResult<Song>>;
  getById(id: string, signal?: AbortSignal): Promise<Song>;
  getSongsOfAuthor: (
    authorId: string,
    params: PaginationParams,
    signal?: AbortSignal,
  ) => Promise<PagedResult<Song>>;
  update(dto: UpdateSongDto): Promise<Song>;
  delete(id: string): Promise<void>;
}

const defaultRoute = "/songs";

export const songRequests: SongRequests = {
  add: (dto) => api.post<Song>(defaultRoute, dto).then((r) => r.data),

  getAll: (params, signal) =>
    api
      .get<PagedResult<Song>>(defaultRoute, { params, signal })
      .then((r) => r.data),

  getById: (id, signal) =>
    api.get<Song>(`${defaultRoute}/${id}`, { signal }).then((r) => r.data),

  getSongsOfAuthor: (authorId, params, signal) =>
    api
      .get<PagedResult<Song>>(`${defaultRoute}/author/${authorId}`, {
        params,
        signal,
      })
      .then((r) => r.data),

  update: (dto) => {
    const { id, ...body } = dto;
    return api.put<Song>(`${defaultRoute}/${id}`, body).then((r) => r.data);
  },
  delete: (id) => api.delete<void>(`${defaultRoute}/${id}`).then(() => {}),
};
