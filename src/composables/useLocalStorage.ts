import { ref, type Ref, watch } from "vue";
import { StorageService } from "@/services/storage.service";

/**
 * Composable for reactive localStorage access.
 * Provides a ref that is automatically persisted to localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const stored = StorageService.get<T>(key, initialValue);
  const value = ref<T>(stored) as Ref<T>;

  watch(
    value,
    (newVal) => {
      StorageService.set(key, newVal);
    },
    { deep: true },
  );

  return value;
}
