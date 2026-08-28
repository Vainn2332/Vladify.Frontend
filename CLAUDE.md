# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then build for production via Vite
- `npm run lint` — run ESLint over the repo
- `npm run preview` — preview the production build locally

There is no test runner configured (no Jest/Vitest/Playwright/Cypress, no test scripts, no `*.test.*`/`*.spec.*` files). If tests are requested, a framework needs to be set up first.

Package manager is npm (only `package-lock.json` is present).

## Architecture

Vladify.Frontend is a React 19 + TypeScript SPA built with Vite, an early-stage music/playlist app gated behind Auth0 authentication.

- **Entry**: `src/main.tsx` wraps the app in `Auth0Provider` (config from `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_AUDIENCE` env vars, plus a separately hardcoded `audience: "https://Vladify/musicAPI"` — note this duplicates/may drift from `VITE_AUTH0_AUDIENCE`).
- **Routing**: `src/routes.tsx` defines routes via `createBrowserRouter`. Protected routes (`/`, `/MyPlaylists`) are wrapped in `components/Auth/ProtectedRoute.tsx`, which redirects unauthenticated users to `/login`. There's a public `/login` route and a catch-all 404.
- **No state-management library** — component-local state only (aside from Auth0's own context). No `store/`, `services/`, `api/`, `hooks/`, or `utils/` directories exist yet.
- **Styling**: Tailwind CSS v4 (CSS-first config via `@tailwindcss/vite`, no `tailwind.config.js` — theming lives in `src/index.css`), mixed with colocated per-component `.css` files for some components.
- **Component convention**: each component/page lives in its own folder named after it (e.g. `components/Card/Card.tsx` + `Card.css`, `pages/HomePage/HomePage.tsx` + `HomePage.css`). Some newer components (e.g. `ProtectedRoute`) use Tailwind utility classes directly instead of a colocated CSS file.
- **TypeScript**: project-references split — `tsconfig.app.json` for app code (strict, `noUnusedLocals`/`noUnusedParameters`, ES2023 target, bundler resolution), `tsconfig.node.json` for `vite.config.ts`.
- Prettier config lives at `src/.prettierrc` (not repo root) and only configures `prettier-plugin-tailwindcss` for class sorting — no custom style rules beyond Prettier defaults.
- UI text includes Russian-language strings (e.g. 404 page) — the app targets a Russian-speaking audience, keep this in mind for user-facing copy.
