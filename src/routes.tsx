import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
