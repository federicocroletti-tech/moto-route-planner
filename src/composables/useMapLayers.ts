import { storeToRefs } from "pinia";
import { useMapStore } from "@/stores/map.store";

/**
 * Composable for map layer management.
 * Wraps the map store and provides convenient helpers.
 */
export function useMapLayers() {
  const mapStore = useMapStore();
  const {
    layers,
    activeBaseLayer,
    baseLayers,
    overlayLayers,
    visibleOverlays,
  } = storeToRefs(mapStore);

  return {
    layers,
    activeBaseLayer,
    baseLayers,
    overlayLayers,
    visibleOverlays,
    loadLayers: mapStore.loadLayers,
    toggleLayer: mapStore.toggleLayer,
    setBaseLayer: mapStore.setBaseLayer,
  };
}
