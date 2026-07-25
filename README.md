# MotoRoute Planner

MotoRoute Planner is a Vue 3 + TypeScript single page application for planning, browsing and saving motorcycle itineraries. It includes mock data, map visualization, itinerary creation, dashboard statistics, i18n, feature flags and optional Keycloak integration.

## Stack

- Vue 3, Vite, TypeScript
- Vue Router, Pinia, Vue I18n
- Leaflet for map rendering
- Tailwind CSS and SCSS theme variables
- Optional Keycloak authentication
- ESLint and Prettier

## Getting Started

```bash
npm install
npm run dev
```

The local Vite server runs on `http://localhost:3000` by default.

## Scripts

```bash
npm run dev          # local development
npm run dev:mock     # local development in mock mode
npm run build        # type-check and production build
npm run build:dev    # Vite development build
npm run build:staging
npm run build:prod
npm run preview      # preview dist output
npm run lint         # ESLint with autofix
npm run format       # Prettier on src files
npm run type-check   # vue-tsc only
```

## Environment

Copy `.env.example` to `.env.local` and adjust values for your environment.

Important variables:

- `VITE_AUTH_MODE`: `mock` or `keycloak`
- `VITE_KEYCLOAK_URL`, `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID`
- `VITE_WMS_BASE_URL`, `VITE_WMS_LAYERS`
- `VITE_FEATURE_ENABLE_*`: feature flags for dashboard, WMS, create itinerary and mock auth

## Project Structure

```text
src/
	app/config/          application, auth, map and theme config
	components/          common UI, itinerary, dashboard, map and auth components
	composables/         shared Vue composition logic
	i18n/                locale setup and translations
	layouts/             app and auth layouts
	mock/                local itinerary data
	models/              TypeScript domain models
	pages/               routed page components
	router/              routes and navigation guards
	services/            local services and integration wrappers
	stores/              Pinia stores
	styles/              Tailwind entry and theme variables
```

## Deployment

The app is a static SPA. Build output is generated in `dist/`.

Supported deployment files are included for:

- Netlify-style static hosting: `public/_redirects`
- Vercel: `vercel.json`
- Nginx container/static hosting: `nginx.conf` and `Dockerfile`

For any static host, configure SPA fallback so unknown routes serve `index.html`.

## Validation

Run before publishing:

```bash
npm run build
npm run lint
```
