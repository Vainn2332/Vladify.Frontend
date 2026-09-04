import { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getPlaylists } from "../api/playlists";
import type { PageParams, Playlist } from "../api/types";

const NO_PLAYLISTS: Playlist[] = [];

interface PlaylistsResult {
  /** The request these playlists came from — see `requestKey` below. */
  key: string;
  playlists: Playlist[];
  error: Error | null;
}

/**
 * Fetches `/api/playlists` with the Auth0 access token for the configured
 * audience. Waits for authentication and aborts the in-flight request when the
 * page changes or the component unmounts; `reload` retries the current page.
 */
export function usePlaylists({ pageNumber, pageSize }: PageParams = {}) {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuth0();

  const [reloadToken, setReloadToken] = useState(0);
  const [result, setResult] = useState<PlaylistsResult | null>(null);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  // Identifies the request the effect is about to make. Comparing it with the
  // key stored alongside the result tells us whether what we hold is current,
  // so loading is derived rather than toggled with an extra render.
  const requestKey = JSON.stringify([
    isAuthenticated,
    pageNumber,
    pageSize,
    reloadToken,
  ]);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;

    const controller = new AbortController();

    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const playlists = await getPlaylists({
          pageNumber,
          pageSize,
          token,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;
        setResult({ key: requestKey, playlists, error: null });
      } catch (caught) {
        if (controller.signal.aborted) return;
        setResult({
          key: requestKey,
          playlists: NO_PLAYLISTS,
          error: caught instanceof Error ? caught : new Error(String(caught)),
        });
      }
    })();

    return () => controller.abort();
  }, [
    getAccessTokenSilently,
    isAuthLoading,
    isAuthenticated,
    pageNumber,
    pageSize,
    requestKey,
  ]);

  const current = result?.key === requestKey ? result : null;

  return {
    playlists: current?.playlists ?? NO_PLAYLISTS,
    error: current?.error ?? null,
    isLoading: isAuthLoading || (isAuthenticated && current === null),
    reload,
  };
}
