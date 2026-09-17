import { useMemo } from "react";
import { useApiClient } from "../useApiClient";
import type { addSongToPlaylistDto, createPlaylistDto, deleteSongFromPlaylistDto, playlist, updatePlaylistDto } from "../dtos/playlist";
import type { paginationParams } from "../dtos/paginationParams";

export interface PlaylistsService {
  add(dto: createPlaylistDto): Promise<playlist>;
  AddSongToPlaylist(dto: addSongToPlaylistDto):Promise<playlist>;
  getAll(params: paginationParams): Promise<playlist[]>;
  getById(id: string): Promise<playlist>;
  getPlaylistsOfUser(params:paginationParams):Promise<playlist[]>;
  update(dto:updatePlaylistDto):Promise<playlist>;
  deleteSongFromPlaylist(dto:deleteSongFromPlaylistDto):Promise<playlist>;
  delete(id: string): Promise<void>;
}

export function usePlaylistsService(): PlaylistsService {
  const api = useApiClient();

  return useMemo(
    () => ({
      add: (dto) => api.post<playlist>("/playlists", dto).then((r) => r.data),
      
      addSongToPlaylist:(dto)=> api.post<playlist>(`/playlists/${dto.playlistId}/songs/${dto.songId}`,...dto).then((r)=>r.data),

      getAll: (params) =>
         api.get<playlist[]>("/playlists", { params }).then((r) => r.data),

      getById: (id) =>
        api.get<playlist>(`/playlists/${id}`).then((r) => r.data),

      getPlaylistsOfUser:(params)=>api.get<playlist>("/playlists",{params}).then((r)=>r.data), 

      update: (dto)=>api.put<playlist>(`/playlists/${dto.id},...dto`),

      deleteSongFromPlaylist: (dto)=> api.delete<playlist>(`/playlists/${dto.playlistId}/songs/${dto.songId}`).then((r)=>r.data),
      
      delete: (id) => api.delete<void>(`/playlists/${id}`).then((r) => r.data),
    }),
    [api],
  );
}
