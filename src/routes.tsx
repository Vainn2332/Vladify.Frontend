import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { MainLayout } from "./components/Layout/MainLayout";
import { MyPlaylistsPage } from "./pages/MyPlaylistsPage/MyPlaylistsPage";
import { PlaylistPage } from "./pages/PlaylistPage/PlaylistPage";
import { CreateSongModal } from "./components/Modals/CreateSongModal/CreateSongModal";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/MyPlaylists",
            element: <MyPlaylistsPage />,
          },
          {
            path: "/Playlists/:playlistId?",
            element: <PlaylistPage />,
          },
        ],
      },
      {
        path: "/test",
        element: <CreateSongModal onClose={() => console.log(1)} />,
      },
      {
        path: "*",
        element: (
          <div className="p-8 text-center">
            <h2>404 — Page not found</h2>
          </div>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
