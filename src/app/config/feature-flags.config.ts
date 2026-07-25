import type { FeatureFlags } from "@/models/client-config.model";

/**
 * Feature flags are driven by environment variables.
 * Each flag defaults to `true` when the env var is not set,
 * so the app works out-of-the-box in mock mode.
 */
const getFlag = (key: string, fallback = true): boolean => {
  const value = import.meta.env[key];
  if (value === undefined || value === "") return fallback;
  return value === "true";
};

export const featureFlags: FeatureFlags = {
  enableFavorites: getFlag("VITE_FEATURE_ENABLE_FAVORITES", true),
  enableDashboard: getFlag("VITE_FEATURE_ENABLE_DASHBOARD", true),
  enableKeycloak: getFlag("VITE_FEATURE_ENABLE_KEYCLOAK", false),
  enableMockAuth: getFlag("VITE_FEATURE_ENABLE_MOCK_AUTH", true),
  enableWmsLayers: getFlag("VITE_FEATURE_ENABLE_WMS_LAYERS", true),
  enableCreateItinerary: getFlag("VITE_FEATURE_ENABLE_CREATE_ITINERARY", true),
  enableDarkMode: getFlag("VITE_FEATURE_ENABLE_DARK_MODE", true),
  enableExportPdfMock: getFlag("VITE_FEATURE_ENABLE_EXPORT_PDF_MOCK", true),
};
