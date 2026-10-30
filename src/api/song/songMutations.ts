import { mutationOptions } from "@tanstack/react-query";
import type { AddSongDto, Song } from "./song";
import { songRequests } from "./songRequests";
import { songKeys } from "./songKeys";
import type { PagedResult } from "../dtos/pagedResult";

export const songMutations = {
  create: mutationOptions({
    mutationFn: (dto: AddSongDto) => songRequests.add(dto),
    onSuccess: (_data, _variables, _onMutateResult, { client }) =>
      client.invalidateQueries({ queryKey: songKeys.list() }),
  }),

  delete: mutationOptions({
    mutationFn: (id: string) => songRequests.delete(id),
    onMutate: async (songId, { client }) => {
      await client.cancelQueries({ queryKey: songKeys.list() });

      const previousQueries = client.getQueriesData({
        queryKey: songKeys.list(),
      });

      client.setQueriesData<PagedResult<Song>>(
        { queryKey: songKeys.list() },
        (old) =>
          old && { ...old, data: old.data.filter((s) => s.id !== songId) },
      );

      return { previousQueries };
    },
    onError: (_error, _variables, onMutateResult, { client }) => {
      if (onMutateResult?.previousQueries) {
        onMutateResult.previousQueries.forEach(([queryKey, data]) => {
          client.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: (_data, _error, _variables, _onMutateResult, { client }) =>
      client.invalidateQueries({ queryKey: songKeys.list() }),
  }),
};
