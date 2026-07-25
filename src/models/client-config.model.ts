import type { ThemeConfig } from "./theme.model";
import type { AuthConfig } from "./auth.model";
import type { MapDefaults } from "./map-layer.model";

export interface FeatureFlags {
  enableFavorites: boolean;
  enableDashboard: boolean;
  enableKeycloak: boolean;
  enableMockAuth: boolean;
  enableWmsLayers: boolean;
  enableCreateItinerary: boolean;
  enableDarkMode: boolean;
  enableExportPdfMock: boolean;
}

export interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  requiresAuth: boolean;
  requiredRole?: string;
}

export interface ClientConfig {
  appName: string;
  appSubtitle: string;
  logoPath: string;
  defaultLanguage: string;
  availableLanguages: string[];
  companyName: string;
  supportEmail: string;
  footerText: string;
  themeName: string;
  enabledFeatures: FeatureFlags;
  mapDefaults: MapDefaults;
  authMode: AuthConfig["mode"];
  navigation: NavigationItem[];
  theme: ThemeConfig;
}
