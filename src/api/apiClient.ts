import axios from "axios";
import { TokenGetterNotSetError } from "../constants/errors";

let getTokenAsync: (() => Promise<string>) | null = null;
export function setTokenGetter(getter: () => Promise<string>) {
  getTokenAsync = getter;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  if (!getTokenAsync) {
    throw new TokenGetterNotSetError();
  }
  const token = await getTokenAsync();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
