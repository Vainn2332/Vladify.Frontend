import { useAuth0 } from "@auth0/auth0-react";
import type { ReactNode } from "react";
import { setTokenGetter } from "../../api/apiClient";

export function AuthTokenBridge({ children }: { children: ReactNode }) {
  const { getAccessTokenSilently } = useAuth0();
  setTokenGetter(getAccessTokenSilently);
  return children;
}
