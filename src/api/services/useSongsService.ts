import { useMemo } from "react";
import { useApiClient } from "../useApiClient";
import type { song } from "../dtos/song";

export interface SongsService {
  getAll(): Promise<song[]>;
  getById(id: string): Promise<song>;
}

export function useSongsService(): SongsService {
  const api = useApiClient();

  return useMemo(
    () => ({
      getAll: () => api.get<song[]>("/songs").then((r) => r.data),

      getById: (id) => api.get<song>(`/songs/${id}`).then((r) => r.data),
    }),
    [api],
  );
}
