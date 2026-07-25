<template>
  <div class="page-container">
    <BasePageHeader
      :title="t('favorites.title')"
      :subtitle="t('favorites.subtitle')"
    />
    <div v-if="favorites.length === 0" class="text-center py-12">
      <BaseEmptyState
        :title="t('favorites.empty')"
        :message="t('favorites.emptyMessage')"
      />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ItineraryCard
        v-for="itinerary in favorites"
        :key="itinerary.id"
        :itinerary="itinerary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useItineraryStore } from "@/stores/itinerary.store";
import BasePageHeader from "@/components/common/BasePageHeader.vue";
import BaseEmptyState from "@/components/common/BaseEmptyState.vue";
import ItineraryCard from "@/components/itinerary/ItineraryCard.vue";

const { t } = useI18n();
const store = useItineraryStore();
const favorites = computed(() => store.favorites);
</script>
