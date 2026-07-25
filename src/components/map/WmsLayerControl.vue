<template>
  <div class="bg-surface border border-border rounded-lg p-4">
    <h3 class="text-sm font-medium text-text mb-3">{{ t("map.wmsLayers") }}</h3>
    <div class="space-y-2">
      <label
        v-for="layer in wmsLayers"
        :key="layer.id"
        class="flex items-center space-x-2"
      >
        <input
          type="checkbox"
          :value="layer.id"
          :checked="activeLayers.includes(layer.id)"
          class="w-4 h-4 rounded bg-border text-accent focus:ring-accent"
          @change="toggleLayer(layer.id)"
        />
        <span class="text-sm text-text">{{ layer.name }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useMapStore } from "@/stores/map.store";

const props = defineProps<{
  mapStore: typeof useMapStore extends () => infer R ? R : never;
}>();
const { t } = useI18n();

const wmsLayers = computed(() =>
  props.mapStore.overlayLayers.filter((layer) => layer.type === "wms"),
);
const activeLayers = computed(() =>
  props.mapStore.visibleOverlays.map((layer) => layer.id),
);

function toggleLayer(id: string) {
  props.mapStore.toggleLayer(id);
}
</script>
