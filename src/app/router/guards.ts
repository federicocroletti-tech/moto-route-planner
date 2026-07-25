import type { Router } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

export function setupAuthGuard(router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore();
    if (authStore.isLoading) {
      await authStore.init();
    }
    const requiresAuth = to.meta.requiresAuth === true;
    const requiredRole = to.meta.requiredRole as string | undefined;
    if (requiresAuth && !authStore.isAuthenticated) {
      next({ name: "login" });
      return;
    }
    if (requiresAuth && requiredRole && !authStore.hasRole(requiredRole)) {
      next({ name: "home" });
      return;
    }
    next();
  });
}
