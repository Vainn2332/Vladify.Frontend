import { playlistRequests } from "./playlistRequests";
import { mutationOptions } from "@tanstack/react-query";
import type {
  createPlaylistDto,
  deleteSongFromPlaylistDto,
  updatePlaylistDto,
} from "./playlist";
import { playlistKeys } from "./playlistKeys";

export const playlistMutations = {
  create: mutationOptions({
    mutationFn: (dto: createPlaylistDto) => playlistRequests.add(dto),
    onSuccess: (_data, _variables, _onMutateResult, { client }) =>
      client.invalidateQueries({ queryKey: playlistKeys.list() }),
  }),

  rename: mutationOptions({
    mutationFn: (dto: updatePlaylistDto) => playlistRequests.update(dto),
    onSuccess: (data, variables, _onMutateResult, { client }) => {
      client.setQueryData(playlistKeys.detail(variables.id), data);
      return client.invalidateQueries({ queryKey: playlistKeys.list() });
    },
  }),

  removeSongFromPlaylist: mutationOptions({
    mutationFn: (dto: deleteSongFromPlaylistDto) =>
      playlistRequests.deleteSongFromPlaylist(dto),

    onMutate: async ({ playlistId, songId }, { client }) => {
      const queryKey = playlistKeys.detail(playlistId);

      await client.cancelQueries({ queryKey });

      const previousData = client.getQueryData(queryKey);

      client.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          songs: oldData.songs.filter((song: any) => song.id !== songId),
        };
      });
      return { previousData };
    },
    onError: (_error, _variables, onMutateResult, { client }) => {
      if (onMutateResult?.previousData) {
        client.setQueryData(
          playlistKeys.detail(onMutateResult.previousData.id),
          onMutateResult.previousData,
        );
      }
    },
    onSuccess: (data, variables, _onMutateResult, { client }) => {
      client.setQueryData(playlistKeys.detail(variables.playlistId), data);
    },
  }),
};
