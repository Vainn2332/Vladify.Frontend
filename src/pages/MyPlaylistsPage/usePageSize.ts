import { useEffect, useState } from "react";
import {
  DESKTOP_MEDIA_QUERY,
  DESKTOP_PAGE_SIZE,
  MOBILE_PAGE_SIZE,
} from "./myPlaylistsConstants";

/**
 * Page size chosen by viewport width: fewer items on mobile (narrow grid, few
 * columns) so the list stays short, more on desktop. Updates live when the
 * viewport crosses the breakpoint (e.g. rotating a device or resizing).
 */
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

  return isDesktop ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;
}
