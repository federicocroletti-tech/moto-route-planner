<template>
  <header class="bg-surface border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-4">
          <button
            class="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            @click="uiStore.toggleSidebar"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-xl font-bold text-accent">{{
              appConfig.appName
            }}</span>
          </router-link>
        </div>
        <nav class="hidden md:flex items-center space-x-2">
          <router-link
            v-for="item in visibleNav"
            :key="item.key"
            :to="item.path"
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive(item.path)
                ? 'bg-accent text-background'
                : 'text-muted hover:text-text hover:bg-secondary'
            "
          >
            {{ t(item.label) }}
          </router-link>
        </nav>
        <div class="flex items-center space-x-3">
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUiStore } from "@/stores/ui.store";
import { useAuthStore } from "@/stores/auth.store";
import { appConfig } from "@/app/config/app.config";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import UserMenu from "./UserMenu.vue";

const uiStore = useUiStore();
const authStore = useAuthStore();
const { t } = useI18n();

const visibleNav = computed(() => {
  return appConfig.navigation.filter((item) => {
    if (!item.requiresAuth) return true;
    if (!authStore.isAuthenticated) return false;
    if (item.requiredRole && !authStore.hasRole(item.requiredRole))
      return false;
    return true;
  });
});

function isActive(path: string): boolean {
  return window.location.pathname === path;
}
</script>
