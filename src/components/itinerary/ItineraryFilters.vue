<template>
  <div class="bg-surface border border-border rounded-lg p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <BaseInput v-model="filters.search" placeholder="Cerca..." />
      <BaseSelect
        v-model="filters.difficulty"
        placeholder="Difficoltà"
        :options="difficultyOptions"
      />
      <BaseSelect
        v-model="filters.rideType"
        placeholder="Tipo giro"
        :options="rideTypeOptions"
      />
      <BaseSelect
        v-model="filters.period"
        placeholder="Periodo"
        :options="periodOptions"
      />
    </div>
    <div class="mt-4 flex items-center justify-between">
      <BaseSelect
        v-model="sortField"
        placeholder="Ordina per"
        :options="sortOptions"
      />
      <BaseButton variant="ghost" @click="resetFilters">{{
        t("filters.reset")
      }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import { useItineraryFilters } from "@/composables/useItineraryFilters";

const { t } = useI18n();
const { filters, resetFilters } = useItineraryFilters();
const sortField = ref("distance");

const difficultyOptions = [
  { value: "easy", label: t("difficulty.easy") },
  { value: "medium", label: t("difficulty.medium") },
  { value: "hard", label: t("difficulty.hard") },
];
const rideTypeOptions = [
  { value: "scenic", label: t("rideType.scenic") },
  { value: "romantic", label: t("rideType.romantic") },
  { value: "technical", label: t("rideType.technical") },
  { value: "short", label: t("rideType.short") },
  { value: "weekend", label: t("rideType.weekend") },
  { value: "tourist", label: t("rideType.tourist") },
];
const periodOptions = [
  { value: "spring", label: t("period.spring") },
  { value: "summer", label: t("period.summer") },
  { value: "autumn", label: t("period.autumn") },
  { value: "winter", label: t("period.winter") },
];
const sortOptions = [
  { value: "distance", label: t("sort.distance") },
  { value: "duration", label: t("sort.duration") },
  { value: "difficulty", label: t("sort.difficulty") },
  { value: "name", label: t("sort.name") },
];
</script>
