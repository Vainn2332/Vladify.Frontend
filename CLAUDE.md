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

- **Entry**: `src/main.tsx` wraps the app in `Auth0Provider`, configured entirely from env vars (`VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_AUDIENCE`). `.env` is gitignored (`*.env`); `.env.example` is committed and documents the required keys. Every `VITE_`-prefixed value is inlined into the client bundle at build time, so none of them can hold a secret.
- **Routing**: `src/routes.tsx` defines routes via `createBrowserRouter`. `components/Layout/MainLayout.tsx` is the app shell (header, `<main>`, fixed player) and wraps every route except `/login`. Inside it, `components/Auth/ProtectedRoute.tsx` guards `/` and `/MyPlaylists`, redirecting unauthenticated users to `/login`; the catch-all 404 also renders inside the shell. Note `routes.tsx` imports from `react-router` while other files import from `react-router-dom` — only the latter is a direct dependency, so `react-router` resolves transitively.
- **No state-management library** — component-local state only (aside from Auth0's own context). No `store/`, `services/`, `api/`, `hooks/`, or `utils/` directories exist yet.
- **Styling**: Tailwind CSS v4 (CSS-first config via `@tailwindcss/vite`, no `tailwind.config.js` — theming lives in `src/index.css`). Predominantly utility classes in JSX; only `Card` and `CardSection` still use colocated `.css` files with BEM-ish class names. Note that CSS files imported via JS land *outside* Tailwind's cascade layers, so their rules beat utility classes regardless of specificity or source order — a utility at the call site cannot override a rule from a colocated `.css` file.
- **Component convention**: two shapes coexist — per-component folders (`components/Card/Card.tsx` + `Card.css`, `components/SearchInput/SearchInput.tsx`) and category folders holding flat files (`components/Modals/CreatePlaylistModal.tsx`, `components/Buttons/IconButton.tsx`, `components/Auth/ProtectedRoute.tsx`). Pages use the per-page folder form (`pages/HomePage/HomePage.tsx`). Shared UI wrappers extend `React.ComponentProps<"element">` and spread `...props` so they stay drop-in replacements for the element they wrap.
- **Page layout**: `MainLayout` owns page chrome and spacing via `<main className="flex-1 p-4 pb-24">`; pages return fragments and add no wrapper or padding of their own. The `pb-24` reserves room for the `position: fixed` `Player`, which occupies no layout space — if the player's height changes, that padding must change with it or page content will hide behind it.
- **TypeScript**: project-references split — `tsconfig.app.json` for app code (strict, `noUnusedLocals`/`noUnusedParameters`, ES2023 target, bundler resolution), `tsconfig.node.json` for `vite.config.ts`.
- Prettier config lives at `src/.prettierrc` (not repo root) and only configures `prettier-plugin-tailwindcss` for class sorting — no custom style rules beyond Prettier defaults.
