import type { Itinerary, ItinerarySummary } from "@/models/itinerary.model";
import { mockItineraries } from "@/mock/itineraries.mock";
import { StorageService } from "./storage.service";

const STORAGE_KEY = "motoroute-itineraries";
const FAVORITES_KEY = "motoroute-favorites";

/**
 * Service that provides access to itinerary data.
 *
 * In this demo version all data is local / mock.
 * The service reads from an in-memory mock array and
 * persists user-created itineraries and favorites to localStorage.
 */
export class ItineraryService {
  private static getLocalItineraries(): Itinerary[] {
    return StorageService.get<Itinerary[]>(STORAGE_KEY, []);
  }

  private static saveLocalItineraries(itineraries: Itinerary[]): void {
    StorageService.set(STORAGE_KEY, itineraries);
  }

  /** Returns all mock + locally created itineraries. */
  static getAll(): Itinerary[] {
    const mock = mockItineraries;
    const local = this.getLocalItineraries();
    const favorites = this.getFavoriteIds();

    // Merge: local itineraries override mock by id
    const byId = new Map<string, Itinerary>();
    for (const it of mock) byId.set(it.id, { ...it });
    for (const it of local) byId.set(it.id, { ...it });

    // Apply favorite flags from storage
    for (const it of byId.values()) {
      it.isFavorite = favorites.includes(it.id);
    }

    return Array.from(byId.values());
  }

  static getById(id: string): Itinerary | null {
    const all = this.getAll();
    return all.find((it) => it.id === id) ?? null;
  }

  static getSummaries(): ItinerarySummary[] {
    return this.getAll().map((it) => ({
      id: it.id,
      title: it.title,
      shortDescription: it.shortDescription,
      distanceKm: it.distanceKm,
      estimatedDuration: it.estimatedDuration,
      difficulty: it.difficulty,
      rideType: it.rideType,
      stopCount: it.stops.length,
      recommendedPeriod: it.recommendedPeriod,
      isRecommended: it.isRecommended,
      isFavorite: it.isFavorite,
      imageUrl: it.imageUrl,
    }));
  }

  static getRecommended(): Itinerary[] {
    return this.getAll().filter((it) => it.isRecommended);
  }

  static create(itinerary: Omit<Itinerary, "id">): Itinerary {
    const newItinerary: Itinerary = {
      ...itinerary,
      id: `local-${Date.now()}`,
    };
    const local = this.getLocalItineraries();
    local.push(newItinerary);
    this.saveLocalItineraries(local);
    return newItinerary;
  }

  static update(id: string, updates: Partial<Itinerary>): Itinerary | null {
    const local = this.getLocalItineraries();
    const idx = local.findIndex((it) => it.id === id);
    if (idx === -1) return null;
    local[idx] = { ...local[idx], ...updates };
    this.saveLocalItineraries(local);
    return local[idx];
  }

  static delete(id: string): boolean {
    const local = this.getLocalItineraries();
    const idx = local.findIndex((it) => it.id === id);
    if (idx === -1) return false;
    local.splice(idx, 1);
    this.saveLocalItineraries(local);
    return true;
  }

  // --- Favorites ---

  static getFavoriteIds(): string[] {
    return StorageService.get<string[]>(FAVORITES_KEY, []);
  }

  static isFavorite(id: string): boolean {
    return this.getFavoriteIds().includes(id);
  }

  static toggleFavorite(id: string): boolean {
    const favorites = this.getFavoriteIds();
    const idx = favorites.indexOf(id);
    if (idx === -1) {
      favorites.push(id);
    } else {
      favorites.splice(idx, 1);
    }
    StorageService.set(FAVORITES_KEY, favorites);
    return !favorites.includes(id) === false ? true : favorites.includes(id);
  }

  static getFavorites(): Itinerary[] {
    const favoriteIds = this.getFavoriteIds();
    return this.getAll().filter((it) => favoriteIds.includes(it.id));
  }
}
