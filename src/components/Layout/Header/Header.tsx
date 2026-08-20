import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="flex justify-between bg-blue-300 p-4">
      <div className="ml-[10%] flex justify-center gap-5">
        <Link to={"/affas"}>Vladify</Link>
        <Link to={"/affas2"}>My playlists</Link>
      </div>
      <div className="bg-card-cover-start rounded-2xl">Search</div>
      <div className="mr-[10%] flex justify-center">Quit</div>
    </div>
  );
}
