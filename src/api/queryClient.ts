import { QueryClient } from "@tanstack/react-query";
import { GenericError, OAuthError } from "@auth0/auth0-react";
import { isAxiosError } from "axios";
import { TokenGetterNotSetError } from "../constants/errors";

const MAX_RETRIES = 3;
const RETRYABLE_CLIENT_STATUSES = [408, 429]; // Request Timeout, Too Many Requests

function isAuthError(error: unknown) {
  return (
    error instanceof GenericError ||
    error instanceof OAuthError ||
    error instanceof TokenGetterNotSetError
  );
}

function isPermanentHttpError(error: unknown) {
  if (!isAxiosError(error) || !error.response) return false;

  const { status } = error.response;
  return status < 500 && !RETRYABLE_CLIENT_STATUSES.includes(status);
}

function shouldRetry(failureCount: number, error: unknown) {
  if (isAuthError(error) || isPermanentHttpError(error)) return false;
  return failureCount < MAX_RETRIES;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: shouldRetry,
    },
  },
});
