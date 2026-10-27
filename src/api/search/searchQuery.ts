import { queryOptions } from "@tanstack/react-query";
import { searchRequest } from "./searchRequest";

export const MIN_SEARCH_QUERY_LENGTH = 2;

export const searchQueryKey = (query: string) => ["search", query];

export const searchQuery = {
  search: (query: string) =>
    queryOptions({
      queryKey: searchQueryKey(query),
      queryFn: ({ signal }) => searchRequest.search(query, signal),
      enabled: query.length >= MIN_SEARCH_QUERY_LENGTH,
    }),
};
