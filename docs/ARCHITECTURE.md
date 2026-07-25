# Architecture

MotoRoute Planner is a client-side Vue SPA organized around domain modules and reusable UI building blocks.

## Runtime Layers

- `pages/`: route-level screens loaded by Vue Router.
- `layouts/`: app shell and authentication layout.
- `components/common/`: reusable UI primitives such as buttons, inputs, cards, badges and modals.
- `components/itinerary/`: itinerary cards, filters, forms and stop lists.
- `components/map/`: Leaflet map, route rendering and optional WMS controls.
- `components/dashboard/`: summary and distribution widgets.
- `stores/`: Pinia stores for auth, itinerary, map and UI state.
- `services/`: data and integration services. The current app uses mock/local storage services.
- `models/`: TypeScript contracts shared across stores, services and components.
- `i18n/`: Vue I18n setup and locale JSON files.

## Data Flow

Itinerary data starts in `mock/itineraries.mock.ts`. `ItineraryService` merges mock data with locally created itineraries and favorites stored in localStorage. `useItineraryStore` exposes the resulting lists, summaries and mutation actions to pages and components.

Filtering is centralized in `useItineraryFilters`, which keeps filter state shared between `ItineraryFilters` and `ItinerariesPage`.

## Maps

Map rendering is handled by Leaflet through `MapView`. `RouteMap` converts itinerary stops into markers and polylines. WMS layer controls are feature-flagged and read layer configuration from the map store.

## Authentication

Auth can run in mock mode or Keycloak mode, controlled by `VITE_AUTH_MODE` and feature flags. Route guards live in the router layer and should remain thin: they ask auth state/services for decisions rather than containing provider-specific logic.

## Configuration

Environment variables are read through app configuration files in `src/app/config`. Feature flags are exposed through composables so views can hide optional capabilities without duplicating env parsing.
