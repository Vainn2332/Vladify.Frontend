# Getting started

Vladify.Frontend is a React 19 + TypeScript SPA built with Vite. Authentication is
handled by Auth0, so the app needs a small amount of configuration before it will
run locally.

## Prerequisites

- **Node.js 20.19+ / 22.12+** (Vite 8 requirement) — Node 24 is what this project is developed on
- **npm** — the only lockfile committed is `package-lock.json`, so please don't use yarn/pnpm
- An **Auth0 tenant** with a Single Page Application and an API registered (see below)

## 1. Install dependencies

Run `npm install` 

## 2. Configure environment variables

Create `.env` file and fill in the variables like in `.env.example`

`.env` is gitignored — never commit it.

| Variable | Description |
| --- | --- |
| `VITE_AUTH0_DOMAIN` | Auth0 tenant domain, e.g. `your-tenant.us.auth0.com`. Found under **Applications → your app → Settings → Domain**. |
| `VITE_AUTH0_CLIENT_ID` | Client ID of the Auth0 **Single Page Application**. Same settings page. |
| `VITE_AUTH0_AUDIENCE` | Identifier of the API the access token is requested for, e.g. `https://Vladify/musicAPI`. Must match the API identifier in Auth0 **exactly** — it's an identifier string, not a URL that gets called. |

> **Note:** every `VITE_`-prefixed variable is inlined into the client bundle at
> build time and is therefore visible to anyone who opens the app. Never put a
> real secret (client secret, API key, connection string) in `.env`.

Vite only reads `.env` at server start — restart `npm run dev` after changing it.

## 3. Configure the Auth0 application

In the Auth0 dashboard, open your SPA application and set:

- **Application Type**: `Single Page Application`
- **Allowed Callback URLs**: `http://localhost:5173`
- **Allowed Logout URLs**: `http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5173`

The app calls Auth0 with `redirect_uri: window.location.origin`, so the URLs above
must be the exact origin the app is served from — no trailing path, no trailing
slash. Add your deployed origin to the same three fields when you deploy.

Refresh tokens are enabled (`useRefreshTokens`), so make sure **Refresh Token
Rotation** is allowed for the application, and that your API has **Allow Offline
Access** turned on if you want sessions to survive a reload.

## 4. Run the app

```bash
npm run dev
```

The dev server listens on **http://localhost:5173** with `strictPort: true` — if
that port is already in use Vite will fail instead of silently picking another
one, because the port has to keep matching the Auth0 callback URLs. Free the port
(or change it in both `vite.config.ts` and the Auth0 settings) before retrying.

Opening `/` redirects you to `/login` until you're authenticated.

## Other scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 5173 |
| `npm run build` | Type-check with `tsc -b`, then build for production into `dist/` |
| `npm run preview` | Serve the production build locally, also on port 5173 |
| `npm run lint` | Run ESLint over the repo |

There is no test runner configured yet.

## Troubleshooting

- **`Callback URL mismatch` from Auth0** — the origin you're browsing from isn't
  in **Allowed Callback URLs**. Check for a trailing slash or `127.0.0.1` instead
  of `localhost`.
- **Stuck redirect loop / instant logout** — `http://localhost:5173` is missing
  from **Allowed Web Origins**, so the silent-auth iframe is blocked.
- **`Service not enabled within domain` / consent errors** — `VITE_AUTH0_AUDIENCE`
  doesn't match a registered API identifier in the tenant.
- **Port 5173 already in use** — `strictPort` is intentional; stop whatever holds
  the port rather than letting Vite move to a different one.
- **Env change had no effect** — restart the dev server; Vite reads `.env` once at
  startup and inlines the values.
