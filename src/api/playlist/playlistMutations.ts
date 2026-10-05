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
    onSuccess: (data, variables, _onMutateResult, { client }) => {
      client.setQueryData(playlistKeys.detail(variables.playlistId), data);
    },
  }),
};
