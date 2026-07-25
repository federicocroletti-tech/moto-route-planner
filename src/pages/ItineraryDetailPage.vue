<template>
  <div class="page-container">
    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>
    <div v-else-if="!itinerary" class="text-center py-12">
      <BaseEmptyState
        :title="t('itinerary.notFound')"
        :message="t('itinerary.notFoundMessage')"
      />
    </div>
    <div v-else>
      <button
        class="text-sm text-accent hover:underline mb-4"
        @click="router.back()"
      >
        &larr; {{ t("common.back") }}
      </button>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-text mb-2">
              {{ itinerary.title }}
            </h1>
            <p class="text-muted">{{ itinerary.shortDescription }}</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              class="bg-surface border border-border rounded-lg p-3 text-center"
            >
              <span class="text-xs text-muted">{{
                t("itinerary.distance")
              }}</span>
              <p class="text-lg font-bold text-text">
                {{ itinerary.distanceKm }} km
              </p>
            </div>
            <div
              class="bg-surface border border-border rounded-lg p-3 text-center"
            >
              <span class="text-xs text-muted">{{
                t("itinerary.duration")
              }}</span>
              <p class="text-lg font-bold text-text">
                {{ itinerary.estimatedDuration }}
              </p>
            </div>
            <div
              class="bg-surface border border-border rounded-lg p-3 text-center"
            >
              <span class="text-xs text-muted">{{
                t("itinerary.difficulty")
              }}</span>
              <p class="text-lg font-bold text-text">
                {{ t(`difficulty.${itinerary.difficulty}`) }}
              </p>
            </div>
            <div
              class="bg-surface border border-border rounded-lg p-3 text-center"
            >
              <span class="text-xs text-muted">{{
                t("itinerary.rideType")
              }}</span>
              <p class="text-lg font-bold text-text">
                {{ t(`rideType.${itinerary.rideType}`) }}
              </p>
            </div>
          </div>
          <div class="h-96">
            <RouteMap :stops="itinerary.stops" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-text mb-4">
              {{ t("itinerary.stops") }}
            </h2>
            <ItineraryStopList :stops="itinerary.stops" />
          </div>
        </div>
        <div class="space-y-6">
          <div class="bg-surface border border-border rounded-lg p-4">
            <h3 class="text-sm font-semibold text-text mb-3">
              {{ t("itinerary.travelTips") }}
            </h3>
            <ul class="space-y-2">
              <li
                v-for="(tip, i) in itinerary.travelTips"
                :key="i"
                class="text-sm text-muted flex items-start gap-2"
              >
                <span class="text-accent">•</span>{{ tip }}
              </li>
            </ul>
          </div>
          <div class="bg-surface border border-border rounded-lg p-4">
            <h3 class="text-sm font-semibold text-text mb-3">
              {{ t("itinerary.recommendedGear") }}
            </h3>
            <ul class="space-y-2">
              <li
                v-for="(gear, i) in itinerary.recommendedEquipment"
                :key="i"
                class="text-sm text-muted flex items-start gap-2"
              >
                <span class="text-accent">•</span>{{ gear }}
              </li>
            </ul>
          </div>
          <button
            class="w-full py-2 rounded-lg font-medium transition-colors"
            :class="
              itinerary.isFavorite
                ? 'bg-danger text-background'
                : 'bg-accent text-background'
            "
            @click="toggleFavorite"
          >
            {{
              itinerary.isFavorite
                ? t("itinerary.removeFromFavorites")
                : t("itinerary.addToFavorites")
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useItineraryStore } from "@/stores/itinerary.store";
import LoadingState from "@/components/common/LoadingState.vue";
import BaseEmptyState from "@/components/common/BaseEmptyState.vue";
import RouteMap from "@/components/map/RouteMap.vue";
import ItineraryStopList from "@/components/itinerary/ItineraryStopList.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const itineraryStore = useItineraryStore();
const loading = ref(true);

const itinerary = computed(() =>
  itineraryStore.getById(route.params.id as string),
);

onMounted(() => {
  void itineraryStore.loadAll();
  setTimeout(() => {
    loading.value = false;
  }, 300);
});

function toggleFavorite() {
  if (!itinerary.value) return;
  itineraryStore.toggleFavorite(itinerary.value.id);
}
</script>
