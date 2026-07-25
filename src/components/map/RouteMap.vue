<template>
  <div class="space-y-4">
    <MapView
      :center="center"
      :zoom="8"
      :markers="mapMarkers"
      :polyline="polylinePoints"
    />
    <WmsLayerControl
      v-if="featureFlags.enableWmsLayers"
      :map-store="mapStore"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MapView from "./MapView.vue";
import WmsLayerControl from "./WmsLayerControl.vue";
import { useMapStore } from "@/stores/map.store";
import { useFeatureFlags } from "@/composables/useFeatureFlags";
import type { ItineraryStop } from "@/models/stop.model";

const props = defineProps<{
  stops: ItineraryStop[];
}>();

const mapStore = useMapStore();
const featureFlags = useFeatureFlags();

const mapMarkers = computed(() =>
  props.stops.map((stop, index) => ({
    lat: stop.latitude,
    lng: stop.longitude,
    title: stop.name,
    description: stop.description,
    index,
  })),
);

const polylinePoints = computed(() =>
  props.stops.map((s) => [s.latitude, s.longitude] as [number, number]),
);

const center = computed((): [number, number] => {
  if (props.stops.length === 0) return [45.4642, 9.1913];
  const first = props.stops[0];
  return [first.latitude, first.longitude];
});
</script>
