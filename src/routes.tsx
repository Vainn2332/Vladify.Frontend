import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { MainLayout } from "./components/Layout/MainLayout";

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
        ],
      },
      {
        path: "*",
        element: (
          <div className="p-8 text-center">
            <h2>404 — Страница не найдена</h2>
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
