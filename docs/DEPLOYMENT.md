# Deployment

MotoRoute Planner builds to a static SPA in `dist/`.

## Required Checks

```bash
npm run build
npm run lint
```

## Static Hosting

Use these settings for most static hosts:

- Install command: `npm ci`
- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: serve `index.html` for unknown routes

## Netlify-Compatible Hosting

`public/_redirects` is copied to `dist/_redirects` by Vite and provides:

```text
/* /index.html 200
```

## Vercel

`vercel.json` sets the Vite build command, output directory and SPA rewrite.

## Docker + Nginx

Build and run locally:

```bash
docker build -t motoroute-planner .
docker run --rm -p 8080:80 motoroute-planner
```

The included `nginx.conf` serves static assets with long-lived cache headers and falls back to `index.html` for client routes.

## Environment Variables

Create environment-specific files from `.env.example`:

- `.env.local` for local development
- `.env.staging` for staging
- `.env.production` for production

Do not commit real Keycloak secrets or private endpoint credentials. Vite exposes every `VITE_*` variable to the browser bundle.
