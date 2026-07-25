<template>
  <div class="page-container">
    <BasePageHeader
      :title="t('dashboard.title')"
      :subtitle="t('dashboard.subtitle')"
    />
    <DashboardSummary :stats="summaryStats" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <DifficultyDistribution :data="difficultyData" />
      <RideTypeDistribution :data="rideTypeData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useItineraryStore } from "@/stores/itinerary.store";
import type { Difficulty } from "@/models/itinerary.model";
import BasePageHeader from "@/components/common/BasePageHeader.vue";
import DashboardSummary from "@/components/dashboard/DashboardSummary.vue";
import DifficultyDistribution from "@/components/dashboard/DifficultyDistribution.vue";
import RideTypeDistribution from "@/components/dashboard/RideTypeDistribution.vue";

const { t } = useI18n();
const store = useItineraryStore();
const allItineraries = computed(() => store.itineraries);

onMounted(() => {
  void store.loadAll();
});

const summaryStats = computed(() => ({
  total: allItineraries.value.length,
  totalKm: allItineraries.value.reduce(
    (sum, itinerary) => sum + itinerary.distanceKm,
    0,
  ),
  totalDuration: allItineraries.value
    .map((itinerary) => itinerary.estimatedDuration)
    .join(", "),
  favorites: store.favorites.length,
}));

const difficultyData = computed(() => {
  const counts: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };
  allItineraries.value.forEach((itinerary) => counts[itinerary.difficulty]++);
  const total = allItineraries.value.length || 1;
  return [
    {
      label: t("difficulty.easy"),
      count: counts.easy,
      percent: (counts.easy / total) * 100,
      color: "bg-success",
    },
    {
      label: t("difficulty.medium"),
      count: counts.medium,
      percent: (counts.medium / total) * 100,
      color: "bg-warning",
    },
    {
      label: t("difficulty.hard"),
      count: counts.hard,
      percent: (counts.hard / total) * 100,
      color: "bg-danger",
    },
  ];
});

const rideTypeData = computed(() => {
  const counts: Record<string, number> = {};
  allItineraries.value.forEach((itinerary) => {
    counts[itinerary.rideType] = (counts[itinerary.rideType] || 0) + 1;
  });
  const total = allItineraries.value.length || 1;
  return Object.entries(counts).map(([key, count]) => ({
    label: t(`rideType.${key}`),
    count,
    percent: (count / total) * 100,
    color: "bg-accent",
  }));
});
</script>
