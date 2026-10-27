import type { SearchResult } from "./searchResult";
import { apiClient as api } from "../apiClient";

interface SearchRequest {
  search: (query: string, signal?: AbortSignal) => Promise<SearchResult>;
}
const searchDefaultRoute = "/search";

export const searchRequest: SearchRequest = {
  search: (query, signal) =>
    api
      .get<SearchResult>(`${searchDefaultRoute}?query=${query}`, { signal })
      .then((r) => r.data),
};
