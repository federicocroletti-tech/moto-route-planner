import type { ClientConfig } from "@/models/client-config.model";
import { themeConfig } from "./theme.config";
import { featureFlags } from "./feature-flags.config";
import { mapDefaults } from "./map.config";
import { authConfig } from "./auth.config";
import { navigationItems } from "./navigation.config";

/**
 * Central application configuration — the single source of truth
 * for white-label customisation.
 *
 * To create a new client variant, copy this file and adjust:
 *   - appName / appSubtitle
 *   - logoPath
 *   - availableLanguages
 *   - companyName / supportEmail / footerText
 *   - themeName (and swap themeConfig.palette)
 *   - enabledFeatures (feature flags)
 *   - mapDefaults
 *   - authMode
 *   - navigation
 */
export const appConfig: ClientConfig = {
  appName: import.meta.env.VITE_APP_NAME || "MotoRoute Planner",
  appSubtitle: "Pianifica il tuo prossimo giro in moto",
  logoPath: "/images/logo.svg",
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || "it",
  availableLanguages: ["it", "en"],
  companyName: "MotoRoute Planner — Federico Demo",
  supportEmail: "support@motoroute.example.com",
  footerText:
    "© 2025 MotoRoute Planner. Tutti i diritti riservati. | Demo portfolio project.",
  themeName: "moto",
  enabledFeatures: featureFlags,
  mapDefaults,
  authMode: authConfig.mode,
  navigation: navigationItems,
  theme: themeConfig,
};
