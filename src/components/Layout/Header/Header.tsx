import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
export function Header() {
  return (
    <div className="grid grid-cols-3 items-center gap-2 bg-linear-to-r from-cyan-300/70 to-teal-500/40 p-4 text-sm md:text-base lg:text-2xl">
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
      <input
        type="text"
        placeholder="Search"
        className="w-full max-w-80 justify-self-center rounded-2xl bg-white/85 py-1 text-center text-cyan-950 shadow-sm backdrop-blur-md transition-all duration-200 outline-none hover:bg-white/70 hover:shadow focus:bg-white/70 focus:ring-2 focus:ring-blue-500/40"
      ></input>
      <div className="flex justify-center">
        <Link to="/Logout">Quit</Link>
      </div>
    </div>
  );
}
