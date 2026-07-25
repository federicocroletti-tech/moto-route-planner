import type { MapLayerConfig, MapDefaults } from "@/models/map-layer.model";

/**
 * Base map layers and WMS overlays.
 *
 * The WMS URLs point to a placeholder endpoint by default.
 * Replace `VITE_WMS_BASE_URL` with a real GeoServer / WMS server
 * to enable real map overlays.
 *
 * When no real WMS is available, the layer control still renders
 * and the technical structure is ready for production use.
 */
const wmsBaseUrl =
  import.meta.env.VITE_WMS_BASE_URL || "https://example.com/geoserver/wms";

export const mapLayers: MapLayerConfig[] = [
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
    id: "osm-hot",
    name: "OpenStreetMap HOT",
    type: "base",
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    visible: false,
    isBaseLayer: true,
    maxZoom: 19,
  },
  {
    id: "wms-scenic-roads",
    name: "Scenic Roads (WMS)",
    type: "wms",
    url: wmsBaseUrl,
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
  {
    id: "wms-natural-areas",
    name: "Natural Areas (WMS)",
    type: "wms",
    url: wmsBaseUrl,
    wms: {
      layers: "motoroute:natural_areas",
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
  {
    id: "wms-points-of-interest",
    name: "Points of Interest (WMS)",
    type: "wms",
    url: wmsBaseUrl,
    wms: {
      layers: "motoroute:points_of_interest",
      format: "image/png",
      transparent: true,
      attribution: "MotoRoute Planner — simulated",
    },
    attribution: "MotoRoute Planner — simulated",
    visible: false,
    isBaseLayer: false,
    minZoom: 10,
    maxZoom: 18,
  },
];

export const mapDefaults: MapDefaults = {
  center: [45.85, 9.65], // approximate center of northern Italy
  zoom: 6,
  minZoom: 4,
  maxZoom: 19,
};
