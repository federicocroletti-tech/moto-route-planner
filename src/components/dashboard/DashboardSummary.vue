<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <StatCard
      :label="t('dashboard.totalItineraries')"
      :value="stats.total"
      icon="🗺️"
    />
    <StatCard
      :label="t('dashboard.totalKm')"
      :value="`${stats.totalKm} km`"
      icon="📏"
    />
    <StatCard
      :label="t('dashboard.totalDuration')"
      :value="stats.totalDuration"
      icon="⏱️"
    />
    <StatCard
      :label="t('dashboard.favorites')"
      :value="stats.favorites"
      icon="❤️"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import StatCard from "./StatCard.vue";

defineProps<{
  stats: {
    total: number;
    totalKm: number;
    totalDuration: string;
    favorites: number;
  };
}>();

const { t } = useI18n();
</script>
