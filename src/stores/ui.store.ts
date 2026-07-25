import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { StorageService } from "@/services/storage.service";

const THEME_KEY = "motoroute-theme";

export type ThemeMode = "light" | "dark" | "auto";

export const useUiStore = defineStore("ui", () => {
  const themeMode = ref<ThemeMode>("dark");
  const isSidebarOpen = ref(false);
  const isMobile = ref(false);

  const isDark = computed(() => {
    if (themeMode.value === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return themeMode.value === "dark";
  });

  function setTheme(mode: ThemeMode): void {
    themeMode.value = mode;
    StorageService.set(THEME_KEY, mode);
    applyThemeClass(mode);
  }

  function initTheme(): void {
    const saved = StorageService.get<ThemeMode>(THEME_KEY, "dark");
    setTheme(saved);
  }

  function applyThemeClass(mode: ThemeMode): void {
    const root = document.documentElement;
    if (mode === "dark" || (mode === "auto" && isDark.value)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  function toggleSidebar(): void {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  function closeSidebar(): void {
    isSidebarOpen.value = false;
  }

  function checkMobile(): void {
    isMobile.value = window.innerWidth < 768;
  }

  // Watch for system preference changes when in auto mode
  watch(isDark, (dark) => {
    if (themeMode.value === "auto") {
      document.documentElement.classList.toggle("dark", dark);
    }
  });

  return {
    themeMode,
    isDark,
    isSidebarOpen,
    isMobile,
    setTheme,
    initTheme,
    toggleSidebar,
    closeSidebar,
    checkMobile,
  };
});
