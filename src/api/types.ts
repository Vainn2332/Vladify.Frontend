export interface Song {
  id: string;
  title: string;
  album: string;
  author: string;
  authorId: string;
  duration: string;
}

export interface Playlist {
  id: string;
  name: string;
  authorName: string;
  songs: Song[];
}

export interface PageParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Error body written by the API's global exception middleware. Every field is
 * optional here because responses produced before that middleware runs — a 401
 * from the JWT bearer handler, for instance — carry no body at all.
 */
export interface ApiErrorDetails {
  errorTitle?: string;
  errorMessage?: string;
  statusCode?: number;
}
