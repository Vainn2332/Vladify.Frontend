import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/logo.png";
import { useState } from "react";

export function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleLogin = () => {
    setIsLoggingIn(true);
    loginWithRedirect();
  };

  const isDisabled = isLoading || isLoggingIn;

  return (
    <div className="bg-app flex min-h-dvh flex-col items-center justify-center p-4 pb-32">
      <div className="bg-login-page-card shadow-card flex w-full max-w-sm flex-col rounded-2xl border-2 border-gray-300 p-7">
        <div className="relative flex items-center justify-center gap-2">
          <img
            src={logo}
            alt="Vladify Logo"
            className="absolute left-0 aspect-square h-12 mix-blend-multiply"
          />
          <h1 className="text-2xl font-bold">Vladify</h1>
        </div>
        <p>Please log in to continue.</p>
        <button
          onClick={handleLogin}
          disabled={isDisabled}
          className="mt-4 cursor-pointer rounded-xl bg-blue-500 px-4 py-2 text-white transition-all hover:-translate-y-1 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoggingIn ? "Redirecting..." : "Log In"}
        </button>
      </div>
    </div>
  );
}
