<template>
  <div>
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-48 bg-secondary rounded-lg animate-pulse"
      ></div>
    </div>
    <div v-else-if="itineraries.length === 0" class="text-center py-12">
      <BaseEmptyState
        :title="t('itinerary.noResults')"
        :message="t('itinerary.noResultsMessage')"
      />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ItineraryCard
        v-for="itinerary in itineraries"
        :key="itinerary.id"
        :itinerary="itinerary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ItineraryCard from "./ItineraryCard.vue";
import BaseEmptyState from "@/components/common/BaseEmptyState.vue";
import type { Itinerary } from "@/models/itinerary.model";

defineProps<{
  itineraries: Itinerary[];
  loading?: boolean;
}>();

const { t } = useI18n();
</script>
