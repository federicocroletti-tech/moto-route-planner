<template>
  <div class="page-container max-w-2xl">
    <BasePageHeader :title="t('profile.title')" />
    <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
      <div class="flex items-center gap-4 pb-4 border-b border-border">
        <div
          class="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-background text-2xl font-bold"
        >
          {{ user?.firstName?.[0] || "?" }}
        </div>
        <div>
          <h2 class="text-xl font-bold text-text">
            {{ user?.firstName }} {{ user?.lastName }}
          </h2>
          <p class="text-sm text-muted">{{ user?.email }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-muted">{{ t("profile.role") }}:</span>
          <span class="text-text">{{ user?.role }}</span>
        </div>
        <div>
          <span class="text-muted">{{ t("profile.language") }}:</span>
          <span class="text-text">{{ locale.toUpperCase() }}</span>
        </div>
        <div>
          <span class="text-muted">{{ t("profile.favorites") }}:</span>
          <span class="text-text">{{ favoritesCount }}</span>
        </div>
        <div>
          <span class="text-muted">{{ t("profile.lastLogin") }}:</span>
          <span class="text-text">{{ lastLogin }}</span>
        </div>
      </div>
      <div class="pt-4 border-t border-border">
        <LogoutButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAuth } from "@/composables/useAuth";
import { useItineraryStore } from "@/stores/itinerary.store";
import BasePageHeader from "@/components/common/BasePageHeader.vue";
import LogoutButton from "@/components/auth/LogoutButton.vue";

const { t, locale } = useI18n();
const { user } = useAuth();
const store = useItineraryStore();
const favoritesCount = computed(() => store.favorites.length);
const lastLogin = new Date().toLocaleDateString();
</script>
