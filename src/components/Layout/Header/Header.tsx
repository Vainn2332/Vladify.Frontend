import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../../assets/logo.png";
import { SearchInput } from "../../SearchInput/SearchInput";

export function Header() {
  const { logout } = useAuth0();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = () => {
    setIsLoggingOut(true);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <header className="grid grid-cols-3 items-center gap-2 bg-linear-to-r from-cyan-300/70 to-teal-500/40 p-4 text-sm md:text-base lg:text-2xl">
      <div className="flex items-center justify-center gap-2">
        <Link to={"/"}>
          <img
            src={logo}
            alt="Vladify logo"
            className="aspect-square max-w-10 mix-blend-multiply sm:hidden"
          ></img>
          <span className="hidden font-bold sm:inline">Vladify</span>
        </Link>
        <Link to={"/MyPlaylists"}>My playlists</Link>
      </div>

      <SearchInput className="w-full max-w-80 justify-self-center" />

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          Quit
        </button>
      </div>
    </header>
  );
}
