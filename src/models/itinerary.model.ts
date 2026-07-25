import type { ItineraryStop } from "./stop.model";

export type Difficulty = "easy" | "medium" | "hard";

export type RideType =
  "scenic" | "romantic" | "technical" | "short" | "weekend" | "tourist";

export type RecommendedPeriod =
  "spring" | "summer" | "autumn" | "winter" | "year-round";

export interface Itinerary {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  distanceKm: number;
  estimatedDuration: string;
  difficulty: Difficulty;
  rideType: RideType;
  stops: ItineraryStop[];
  recommendedPeriod: RecommendedPeriod;
  travelTips: string[];
  recommendedEquipment: string[];
  isRecommended?: boolean;
  isFavorite?: boolean;
  imageUrl?: string;
}

export interface ItinerarySummary {
  id: string;
  title: string;
  shortDescription: string;
  distanceKm: number;
  estimatedDuration: string;
  difficulty: Difficulty;
  rideType: RideType;
  stopCount: number;
  recommendedPeriod: RecommendedPeriod;
  isRecommended?: boolean;
  isFavorite?: boolean;
  imageUrl?: string;
}
