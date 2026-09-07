// How many playlists to request per page, chosen by viewport width. Mobile
// shows fewer so the grid stays ~2 rows and the pagination doesn't get pushed
// far below the fold; desktop fits more columns per row, so it can show more.
export const MOBILE_PAGE_SIZE = 6;
export const DESKTOP_PAGE_SIZE = 20;

// Matches Tailwind's `sm` breakpoint (640px).
export const DESKTOP_MEDIA_QUERY = "(min-width: 640px)";
