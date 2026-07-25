import type { MapLayerConfig } from "@/models/map-layer.model";
import { mapLayers } from "@/app/config/map.config";
import { StorageService } from "./storage.service";

const LAYER_VISIBILITY_KEY = "motoroute-layer-visibility";

/**
 * Service for managing map layer visibility state.
 *
 * Layer definitions come from map.config.ts (which can be swapped
 * per white-label client). Visibility state is persisted to localStorage.
 */
export class MapLayerService {
  static getAllLayers(): MapLayerConfig[] {
    const savedVisibility = this.getSavedVisibility();
    return mapLayers.map((layer) => ({
      ...layer,
      visible: savedVisibility[layer.id] ?? layer.visible,
    }));
  }

  static getBaseLayers(): MapLayerConfig[] {
    return this.getAllLayers().filter((l) => l.isBaseLayer);
  }

  static getOverlayLayers(): MapLayerConfig[] {
    return this.getAllLayers().filter((l) => !l.isBaseLayer);
  }

  static getVisibleLayers(): MapLayerConfig[] {
    return this.getAllLayers().filter((l) => l.visible);
  }

  static toggleLayer(id: string): void {
    const current = this.getSavedVisibility();
    current[id] = !current[id];
    StorageService.set(LAYER_VISIBILITY_KEY, current);
  }

  static setLayerVisibility(id: string, visible: boolean): void {
    const current = this.getSavedVisibility();
    current[id] = visible;
    StorageService.set(LAYER_VISIBILITY_KEY, current);
  }

  static getSavedVisibility(): Record<string, boolean> {
    return StorageService.get<Record<string, boolean>>(
      LAYER_VISIBILITY_KEY,
      {},
    );
  }

  static resetToDefaults(): void {
    StorageService.remove(LAYER_VISIBILITY_KEY);
  }
}
