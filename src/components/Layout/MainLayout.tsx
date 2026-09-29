import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Player } from "./Player/Player";

export function MainLayout() {
  return (
    <div className="bg-app flex min-h-dvh flex-col">
      <Header />

      <main className="flex flex-1 flex-col p-4 pb-24">
        <Outlet />
      </main>

      <Player />
    </div>
  );
}
