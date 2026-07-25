<template>
  <div class="bg-surface border border-border rounded-lg p-3 mb-2">
    <div class="flex items-center space-x-4 text-xs">
      <div class="flex items-center space-x-1">
        <div class="w-3 h-3 bg-accent rounded-full"></div>
        <span class="text-muted">{{ t("map.stop") }}</span>
      </div>
      <div class="flex items-center space-x-1">
        <div class="w-4 h-1 bg-accent rounded"></div>
        <span class="text-muted">{{ t("map.route") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
