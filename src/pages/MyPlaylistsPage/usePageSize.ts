import { useEffect, useState } from "react";
import {
  DESKTOP_MEDIA_QUERY,
  DESKTOP_PAGINATION_SIZE,
  MOBILE_PAGINATION_SIZE,
} from "./myPlaylistsConstants";

export function usePageSize(): number {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(DESKTOP_MEDIA_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) =>
      setIsDesktop(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop ? DESKTOP_PAGINATION_SIZE : MOBILE_PAGINATION_SIZE;
}
