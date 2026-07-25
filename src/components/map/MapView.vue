<template>
  <div
    ref="mapContainer"
    class="h-full w-full rounded-lg overflow-hidden"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps<{
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    description?: string;
    index?: number;
  }>;
  polyline?: Array<[number, number]>;
  height?: string;
}>();

const mapContainer = ref<HTMLElement | null>(null);
const mapInstance: { value: L.Map | null } = { value: null };

onMounted(() => {
  if (!mapContainer.value) return;

  mapInstance.value = L.map(mapContainer.value, {
    center: props.center || [45.4642, 9.1913],
    zoom: props.zoom || 5,
    zoomControl: true,
  });

  // Base layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance.value);

  // Add markers
  props.markers?.forEach((marker) => {
    const markerInstance = L.marker([marker.lat, marker.lng]).addTo(
      mapInstance.value!,
    );
    const popupContent = `
      <div class="text-sm">
        <strong>${marker.index !== undefined ? marker.index + 1 : ""} ${marker.title}</strong>
        ${marker.description ? `<p class="text-xs mt-1">${marker.description}</p>` : ""}
      </div>
    `;
    markerInstance.bindPopup(popupContent);
  });

  // Add polyline
  if (props.polyline && props.polyline.length > 1) {
    L.polyline(props.polyline, { color: "#f97316", weight: 4 }).addTo(
      mapInstance.value,
    );
    const group = L.featureGroup(
      props.markers?.map((m) => L.marker([m.lat, m.lng])) || [],
    );
    if (group.getLayers().length > 0) {
      mapInstance.value.fitBounds(group.getBounds().pad(0.2));
    }
  }
});

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.remove();
    mapInstance.value = null;
  }
});
</script>
