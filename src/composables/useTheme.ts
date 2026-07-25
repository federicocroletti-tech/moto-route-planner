import { storeToRefs } from "pinia";
import { useUiStore } from "@/stores/ui.store";

/**
 * Composable for theme management.
 * Wraps the UI store and provides convenient helpers.
 */
export function useTheme() {
  const uiStore = useUiStore();
  const { themeMode, isDark } = storeToRefs(uiStore);

  return {
    themeMode,
    isDark,
    setTheme: uiStore.setTheme,
    initTheme: uiStore.initTheme,
  };
}
