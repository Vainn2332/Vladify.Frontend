import { API_BASE_URL } from "./config";
import type { ApiErrorDetails } from "./types";

/** A non-2xx response from the API. `status` is the HTTP status code. */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type QueryValue = string | number | boolean | undefined | null;

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  /** Auth0 access token, sent as `Authorization: Bearer <token>`. */
  token?: string;
  /** Query string values; `undefined` and `null` entries are dropped. */
  query?: Record<string, QueryValue>;
  /** Serialized as JSON. */
  body?: unknown;
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  if (!API_BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL is not set — copy .env.example to .env and point it at the API.",
    );
  }

  const url = new URL(`${API_BASE_URL}${path}`);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

/**
 * Pulls the human-readable text out of an error response. The API serializes
 * `ErrorDetails` (camelCased by ASP.NET's web defaults), but responses that
 * never reach its exception middleware — a 401 from the JWT bearer handler, for
 * instance — have an empty body, so fall back to the status line.
 */
async function readErrorMessage(response: Response) {
  const fallback = response.statusText
    ? `${response.status} ${response.statusText}`
    : `Request failed with status ${response.status}`;

  try {
    const text = await response.text();
    if (!text) return fallback;

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) return text;

    const details = JSON.parse(text) as ApiErrorDetails;
    return details.errorMessage || details.errorTitle || fallback;
  } catch {
    return fallback;
  }
}

export async function apiRequest<T>(
  path: string,
  { token, query, body, headers, ...init }: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
