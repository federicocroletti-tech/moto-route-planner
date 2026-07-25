import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

/**
 * Composable for authentication logic.
 * Wraps the auth store and provides convenient helpers.
 */
export function useAuth() {
  const authStore = useAuthStore();
  const { user, token, isLoading, error, isAuthenticated, mode } =
    storeToRefs(authStore);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    mode,
    login: authStore.login,
    logout: authStore.logout,
    init: authStore.init,
    hasRole: authStore.hasRole,
  };
}
