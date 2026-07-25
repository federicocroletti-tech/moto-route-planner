<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-accent mb-4">404</h1>
      <p class="text-xl text-text mb-6">{{ t("notFound.title") }}</p>
      <p class="text-muted mb-8">{{ t("notFound.message") }}</p>
      <router-link
        :to="{ name: 'home' }"
        class="px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/80 transition-colors"
      >
        {{ t("notFound.goHome") }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
