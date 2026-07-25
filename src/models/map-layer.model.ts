export type LayerType = "base" | "overlay" | "wms";

export interface MapLayerConfig {
  id: string;
  name: string;
  type: LayerType;
  /**
   * For tile layers: the XYZ URL template.
   * For WMS layers: the WMS endpoint URL.
   */
  url: string;
  /** WMS-specific options */
  wms?: {
    layers: string;
    format?: string;
    transparent?: boolean;
    attribution?: string;
  };
  attribution?: string;
  visible: boolean;
  /** Base layers are mutually exclusive; overlays can be toggled independently. */
  isBaseLayer: boolean;
  /** Optional icon or label shown in the layer control. */
  icon?: string;
  /** Optional max/min zoom constraints. */
  maxZoom?: number;
  minZoom?: number;
}

export interface WmsLayerConfig {
  id: string;
  name: string;
  url: string;
  layers: string;
  format: string;
  transparent: boolean;
  attribution: string;
  visible: boolean;
  minZoom: number;
  maxZoom: number;
}

export interface MapDefaults {
  center: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
}
