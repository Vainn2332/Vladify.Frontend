import { useMemo } from "react";
import { useApiClient } from "../useApiClient";
import type { addSongDto, song, updateSongDto } from "../dtos/song";
import type { paginationParams } from "../dtos/paginationParams";
import type { pagedResult } from "../dtos/pagedResult";

export interface SongsService {
  add(dto: addSongDto): Promise<song>;
  getAll(
    params: paginationParams,
    signal?: AbortSignal,
  ): Promise<pagedResult<song>>;
  getById(id: string, signal?: AbortSignal): Promise<song>;
  update(dto: updateSongDto): Promise<song>;
  delete(id: number): Promise<void>;
}

const defaultRoute = "/songs";

export function useSongsService(): SongsService {
  const api = useApiClient();

  return useMemo(
    () => ({
      add: (dto) => api.post<song>(defaultRoute, dto).then((r) => r.data),

      getAll: (params, signal) =>
        api
          .get<pagedResult<song>>(defaultRoute, { params, signal })
          .then((r) => r.data),

      getById: (id, signal) =>
        api.get<song>(`${defaultRoute}/${id}`, { signal }).then((r) => r.data),

      update: (dto) => {
        const { id, ...body } = dto;
        return api.put<song>(`${defaultRoute}/${id}`, body).then((r) => r.data);
      },
      delete: (id) => api.delete<void>(`${defaultRoute}/${id}`).then(() => {}),
    }),
    [api],
  );
}
