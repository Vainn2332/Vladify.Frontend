import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { MyPlaylistsPage } from "./pages/MyPlaylistsPage/MyPlaylistsPage";

export const router = createBrowserRouter([
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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: (
      <div style={{ padding: 32, textAlign: "center" }}>
        <h2>404 — Страница не найдена</h2>
      </div>
    ),
  },
]);
