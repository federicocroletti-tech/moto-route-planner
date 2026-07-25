import { createI18n } from "vue-i18n";
import { appConfig } from "@/app/config/app.config";
import it from "./locales/it.json";
import en from "./locales/en.json";

export const i18n = createI18n({
  locale: appConfig.defaultLanguage,
  fallbackLocale: "en",
  messages: {
    it: it as Record<string, unknown>,
    en: en as Record<string, unknown>,
  },
  legacy: false,
  missing: (locale: string, key: string) => {
    console.warn(`[i18n] Missing key: ${key} (locale: ${locale})`);
    return key;
  },
} as Parameters<typeof createI18n>[0]);

export function setLocale(locale: string): void {
  i18n.global.locale = locale;
}

export function getAvailableLocales(): string[] {
  return appConfig.availableLanguages;
}
