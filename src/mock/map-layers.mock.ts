import type { MapLayerConfig } from "@/models/map-layer.model";

/**
 * Re-exported from map.config.ts for backwards compatibility.
 * Some services may import from `@/mock/map-layers.mock` directly.
 */
export { mapLayers, mapDefaults } from "@/app/config/map.config";

export const mockMapLayers: MapLayerConfig[] = [
  {
    id: "osm-standard",
    name: "OpenStreetMap Standard",
    type: "base",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    visible: true,
    isBaseLayer: true,
    maxZoom: 19,
  },
  {
    id: "wms-scenic-roads",
    name: "Scenic Roads (WMS)",
    type: "wms",
    url: "https://example.com/geoserver/wms",
    wms: {
      layers: "motoroute:scenic_roads",
      format: "image/png",
      transparent: true,
      attribution: "MotoRoute Planner — simulated",
    },
    attribution: "MotoRoute Planner — simulated",
    visible: false,
    isBaseLayer: false,
    minZoom: 8,
    maxZoom: 16,
  },
];
