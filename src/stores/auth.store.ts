import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "@/models/user.model";
import { AuthService } from "@/services/auth.service";
import { authConfig } from "@/app/config/auth.config";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(
    () => user.value !== null && token.value !== null,
  );
  const mode = computed(() => authConfig.mode);

  async function init(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      await AuthService.init();
      const session = AuthService.getSession();
      user.value = session.user;
      token.value = session.token;
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  function login(): void {
    error.value = null;
    try {
      const result = AuthService.login();
      if (result) {
        user.value = result.user;
        token.value = result.token;
      }
    } catch (e) {
      error.value = (e as Error).message;
    }
  }

  function logout(): void {
    AuthService.logout();
    user.value = null;
    token.value = null;
  }

  function hasRole(role: string): boolean {
    if (!user.value) return false;
    const roleHierarchy: Record<string, string[]> = {
      guest: ["guest"],
      rider: ["guest", "rider"],
      admin: ["guest", "rider", "admin"],
    };
    return roleHierarchy[user.value.role]?.includes(role) ?? false;
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    mode,
    init,
    login,
    logout,
    hasRole,
  };
});
