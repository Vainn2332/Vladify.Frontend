import { useMemo } from "react";
import axios, { type AxiosInstance } from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useApiClient(): AxiosInstance {
  const { getAccessTokenSilently } = useAuth0();

  return useMemo(() => {
    const client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    client.interceptors.request.use(async (config) => {
      const token = await getAccessTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return client;
  }, [getAccessTokenSilently]);
}
