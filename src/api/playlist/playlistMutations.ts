import { playlistRequests } from "./playlistRequests";
import { mutationOptions } from "@tanstack/react-query";
import type {
  createPlaylistDto,
  deleteSongFromPlaylistDto,
  updatePlaylistDto,
} from "./playlist";
import { playlistKeys } from "./playlistKeys";
import { playlistQueries } from "./playlistQueries";

export const playlistMutations = {
  create: mutationOptions({
    mutationFn: (dto: createPlaylistDto) => playlistRequests.add(dto),
    onSuccess: (_data, _variables, _onMutateResult, { client }) =>
      client.invalidateQueries({ queryKey: playlistKeys.list() }),
  }),

  rename: mutationOptions({
    mutationFn: (dto: updatePlaylistDto) => playlistRequests.update(dto),
    onMutate: async ({ id, name }, { client }) => {
      const queryKey = playlistQueries.detail(id).queryKey;
      await client.cancelQueries({ queryKey });

      const previousName = client.getQueryData(queryKey)?.name;
      client.setQueryData(queryKey, (old) => old && { ...old, name });

      return { previousName };
    },

    onError: (_error, { id }, onMutateResult, { client }) => {
      if (onMutateResult?.previousName) {
        client.setQueryData(
          playlistKeys.detail(id),
          onMutateResult.previousName,
        );
      }
    },
    onSuccess: (data, { id }, _onMutateResult, { client }) => {
      client.setQueryData(
        playlistQueries.detail(id).queryKey,
        (old) => old && { ...old, name: data.name },
      );
      return client.invalidateQueries({ queryKey: playlistKeys.list() });
    },
  }),

  removeSongFromPlaylist: mutationOptions({
    mutationFn: (dto: deleteSongFromPlaylistDto) =>
      playlistRequests.deleteSongFromPlaylist(dto),

    onMutate: async ({ playlistId, songId }, { client }) => {
      const queryKey = playlistQueries.detail(playlistId).queryKey;

      await client.cancelQueries({ queryKey });

      const previousData = client.getQueryData(queryKey);

      client.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          songs: oldData.songs.filter((song) => song.id !== songId),
        };
      });
      return { previousData };
    },
    onError: (_error, { playlistId }, onMutateResult, { client }) => {
      if (onMutateResult?.previousData) {
        client.setQueryData(
          playlistKeys.detail(playlistId),
          onMutateResult.previousData,
        );
      }
    },
    onSuccess: (data, variables, _onMutateResult, { client }) => {
      client.setQueryData(playlistKeys.detail(variables.playlistId), data);
    },
  }),
};
