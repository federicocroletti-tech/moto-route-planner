/**
 * Represents a single stop (tappa) along an itinerary.
 */
export type StopType =
  "start" | "saddle" | "panorama" | "lunch" | "gas" | "end";

export interface ItineraryStop {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  estimatedTimeFromPrevious: string;
  type: StopType;
}

/**
 * Convenience: human-readable labels for stop types (used by i18n keys).
 */
export const STOP_TYPE_LABELS: Record<StopType, string> = {
  start: "start",
  saddle: "saddle",
  panorama: "panorama",
  lunch: "lunch",
  gas: "gas",
  end: "end",
};
