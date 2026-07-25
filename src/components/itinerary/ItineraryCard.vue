<template>
  <BaseCard>
    <template #header>
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-bold text-text">{{ itinerary.title }}</h3>
        <BaseBadge v-if="itinerary.isRecommended" variant="accent">{{
          t("itinerary.recommended")
        }}</BaseBadge>
      </div>
    </template>
    <div class="space-y-3">
      <p class="text-sm text-muted line-clamp-2">
        {{ itinerary.shortDescription }}
      </p>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span class="text-muted">{{ t("itinerary.distance") }}:</span>
          {{ itinerary.distanceKm }} km
        </div>
        <div>
          <span class="text-muted">{{ t("itinerary.duration") }}:</span>
          {{ itinerary.estimatedDuration }}
        </div>
        <div>
          <span class="text-muted">{{ t("itinerary.difficulty") }}:</span>
          {{ t(`difficulty.${itinerary.difficulty}`) }}
        </div>
        <div>
          <span class="text-muted">{{ t("itinerary.rideType") }}:</span>
          {{ t(`rideType.${itinerary.rideType}`) }}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-muted"
          >{{ itinerary.stops.length }} {{ t("itinerary.stops") }}</span
        >
        <button
          class="text-accent hover:text-accent/80"
          @click="toggleFavorite"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            :class="itinerary.isFavorite ? 'text-accent' : 'text-muted'"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 19.09 2 15.14 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 6.64-3.4 10.59-8.55 11.83L12 21.35z"
            />
          </svg>
        </button>
      </div>
    </div>
    <template #footer>
      <router-link
        :to="{ name: 'itinerary-detail', params: { id: itinerary.id } }"
        class="text-sm text-accent hover:underline"
      >
        {{ t("itinerary.viewDetails") }}
      </router-link>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useItineraryStore } from "@/stores/itinerary.store";
import BaseCard from "@/components/common/BaseCard.vue";
import BaseBadge from "@/components/common/BaseBadge.vue";
import type { Itinerary } from "@/models/itinerary.model";

const props = defineProps<{ itinerary: Itinerary }>();
const { t } = useI18n();
const itineraryStore = useItineraryStore();

function toggleFavorite() {
  itineraryStore.toggleFavorite(props.itinerary.id);
}
</script>
