<template>
  <div class="page-container">
    <BasePageHeader
      :title="t('itinerary.title')"
      :subtitle="t('itinerary.subtitle')"
    />
    <ItineraryFilters />
    <ItineraryList :itineraries="filteredItineraries" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useItineraryStore } from "@/stores/itinerary.store";
import { useItineraryFilters } from "@/composables/useItineraryFilters";
import BasePageHeader from "@/components/common/BasePageHeader.vue";
import ItineraryFilters from "@/components/itinerary/ItineraryFilters.vue";
import ItineraryList from "@/components/itinerary/ItineraryList.vue";

const { t } = useI18n();
const itineraryStore = useItineraryStore();
const { filtered: filteredItineraries } = useItineraryFilters(
  () => itineraryStore.itineraries,
);
const loading = ref(false);

onMounted(() => {
  loading.value = true;
  void itineraryStore.loadAll();
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
