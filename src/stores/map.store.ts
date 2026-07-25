import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { MapLayerConfig } from "@/models/map-layer.model";
import { MapLayerService } from "@/services/map-layer.service";

export const useMapStore = defineStore("map", () => {
  const layers = ref<MapLayerConfig[]>([]);
  const activeBaseLayer = ref<string | null>(null);

  const baseLayers = computed(() => layers.value.filter((l) => l.isBaseLayer));

  const overlayLayers = computed(() =>
    layers.value.filter((l) => !l.isBaseLayer),
  );

  const visibleOverlays = computed(() =>
    overlayLayers.value.filter((l) => l.visible),
  );

  function loadLayers(): void {
    layers.value = MapLayerService.getAllLayers();
    const visibleBase = layers.value.find((l) => l.isBaseLayer && l.visible);
    if (visibleBase) {
      activeBaseLayer.value = visibleBase.id;
    }
  }

  function toggleLayer(id: string): void {
    MapLayerService.toggleLayer(id);
    const layer = layers.value.find((l) => l.id === id);
    if (layer) {
      layer.visible = !layer.visible;
      if (layer.isBaseLayer && layer.visible) {
        activeBaseLayer.value = id;
      }
    }
  }

  function setBaseLayer(id: string): void {
    activeBaseLayer.value = id;
    layers.value.forEach((l) => {
      if (l.isBaseLayer) {
        l.visible = l.id === id;
      }
    });
  }

  return {
    layers,
    activeBaseLayer,
    baseLayers,
    overlayLayers,
    visibleOverlays,
    loadLayers,
    toggleLayer,
    setBaseLayer,
  };
});
