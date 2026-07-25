<template>
  <div class="relative">
    <button
      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary transition-colors"
      @click="open = !open"
    >
      <span class="hidden sm:block text-sm font-medium">{{
        user?.firstName || t("auth.mockMode")
      }}</span>
      <div
        class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-background font-bold text-sm"
      >
        {{ user?.firstName?.[0] || "?" }}
      </div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-50"
      >
        <router-link
          :to="{ name: 'profile' }"
          class="block px-4 py-2 text-sm hover:bg-secondary transition-colors first:rounded-t-lg"
          @click="open = false"
        >
          {{ t("nav.profile") }}
        </router-link>
        <button
          class="block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors last:rounded-b-lg"
          @click="logout"
        >
          {{ t("auth.logout") }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { user, logout } = useAuth();
const open = ref(false);
</script>
