import type { SearchResult } from "./searchResult";
import { apiClient as api } from "../apiClient";

interface SearchRequest {
  search: (query: string, signal?: AbortSignal) => Promise<SearchResult>;
}
const searchDefaultRoute = "/search";

export const searchRequest: SearchRequest = {
  search: async (query, signal) => {
    const encodedQuery = encodeURIComponent(query);

    const r = await api.get<SearchResult>(
      `${searchDefaultRoute}?query=${encodedQuery}`,
      { signal },
    );

    return r.data;
  },
};
