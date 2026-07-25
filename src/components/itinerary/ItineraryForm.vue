<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <BaseInput v-model="form.title" :label="t('itinerary.title')" required />
    <BaseInput
      v-model="form.shortDescription"
      :label="t('itinerary.shortDescription')"
    />
    <div class="grid grid-cols-2 gap-4">
      <BaseSelect
        v-model="form.rideType"
        :label="t('itinerary.rideType')"
        :options="rideTypeOptions"
      />
      <BaseSelect
        v-model="form.difficulty"
        :label="t('itinerary.difficulty')"
        :options="difficultyOptions"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <BaseInput
        v-model.number="form.distanceKm"
        type="number"
        :label="t('itinerary.distance')"
      />
      <BaseInput
        v-model="form.estimatedDuration"
        :label="t('itinerary.duration')"
      />
    </div>
    <BaseSelect
      v-model="form.recommendedPeriod"
      :label="t('itinerary.recommendedPeriod')"
      :options="periodOptions"
    />
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-text">
          {{ t("itinerary.stops") }}
        </h3>
        <BaseButton type="button" variant="secondary" @click="addStop">{{
          t("itinerary.addStop")
        }}</BaseButton>
      </div>
      <div
        v-for="(stop, index) in form.stops"
        :key="index"
        class="bg-surface border border-border rounded-lg p-4"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-text"
            >{{ t("itinerary.stop") }} {{ index + 1 }}</span
          >
          <BaseButton
            type="button"
            variant="danger"
            size="sm"
            @click="removeStop(index)"
            >{{ t("common.remove") }}</BaseButton
          >
        </div>
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="stop.name" :label="t('stopType.name')" />
          <BaseSelect
            v-model="stop.type"
            :label="t('stopType.type')"
            :options="stopTypeOptions"
          />
          <BaseInput
            v-model.number="stop.latitude"
            type="number"
            step="0.0001"
            :label="t('stopType.latitude')"
          />
          <BaseInput
            v-model.number="stop.longitude"
            type="number"
            step="0.0001"
            :label="t('stopType.longitude')"
          />
          <BaseInput
            v-model="stop.estimatedTimeFromPrevious"
            :label="t('stopType.timeFromPrevious')"
          />
        </div>
      </div>
    </div>
    <BaseButton type="submit" variant="primary">{{
      t("common.save")
    }}</BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useItineraryStore } from "@/stores/itinerary.store";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import type {
  Difficulty,
  Itinerary,
  RecommendedPeriod,
  RideType,
} from "@/models/itinerary.model";
import type { StopType } from "@/models/stop.model";

const { t } = useI18n();
const router = useRouter();
const itineraryStore = useItineraryStore();

const form = reactive({
  title: "",
  shortDescription: "",
  rideType: "scenic" as RideType,
  difficulty: "easy" as Difficulty,
  distanceKm: 0,
  estimatedDuration: "",
  recommendedPeriod: "spring" as RecommendedPeriod,
  stops: [] as Array<{
    name: string;
    type: StopType;
    latitude: number;
    longitude: number;
    estimatedTimeFromPrevious: string;
  }>,
});

const rideTypeOptions = [
  { value: "scenic", label: t("rideType.scenic") },
  { value: "romantic", label: t("rideType.romantic") },
  { value: "technical", label: t("rideType.technical") },
  { value: "short", label: t("rideType.short") },
  { value: "weekend", label: t("rideType.weekend") },
  { value: "tourist", label: t("rideType.tourist") },
];

const difficultyOptions = [
  { value: "easy", label: t("difficulty.easy") },
  { value: "medium", label: t("difficulty.medium") },
  { value: "hard", label: t("difficulty.hard") },
];

const periodOptions = [
  { value: "spring", label: t("period.spring") },
  { value: "summer", label: t("period.summer") },
  { value: "autumn", label: t("period.autumn") },
  { value: "winter", label: t("period.winter") },
];

const stopTypeOptions = [
  { value: "start", label: t("stopType.start") },
  { value: "saddle", label: t("stopType.saddle") },
  { value: "panorama", label: t("stopType.panorama") },
  { value: "lunch", label: t("stopType.lunch") },
  { value: "gas", label: t("stopType.gas") },
  { value: "end", label: t("stopType.end") },
];

function addStop() {
  form.stops.push({
    name: "",
    type: "saddle",
    latitude: 45.0,
    longitude: 9.0,
    estimatedTimeFromPrevious: "",
  });
}

function removeStop(index: number) {
  form.stops.splice(index, 1);
}

function handleSubmit() {
  const newItinerary: Omit<Itinerary, "id"> = {
    title: form.title,
    shortDescription: form.shortDescription,
    fullDescription: form.shortDescription,
    distanceKm: form.distanceKm,
    estimatedDuration: form.estimatedDuration,
    difficulty: form.difficulty,
    rideType: form.rideType,
    recommendedPeriod: form.recommendedPeriod,
    stops: form.stops.map((s, i) => ({
      id: `stop-${Date.now()}-${i}`,
      name: s.name,
      description: "",
      latitude: s.latitude,
      longitude: s.longitude,
      type: s.type,
      estimatedTimeFromPrevious: s.estimatedTimeFromPrevious,
    })),
    isRecommended: false,
    isFavorite: false,
    travelTips: [],
    recommendedEquipment: [],
  };
  itineraryStore.create(newItinerary);
  router.push({ name: "itineraries" });
}
</script>
