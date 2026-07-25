import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Itinerary, ItinerarySummary } from "@/models/itinerary.model";
import { ItineraryService } from "@/services/itinerary.service";

export const useItineraryStore = defineStore("itinerary", () => {
  const itineraries = ref<Itinerary[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const summaries = computed((): ItinerarySummary[] =>
    itineraries.value.map((it) => ({
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
    })),
  );

  const recommended = computed(() =>
    itineraries.value.filter((it) => it.isRecommended),
  );

  const favorites = computed(() =>
    itineraries.value.filter((it) => it.isFavorite),
  );

  const totalDistance = computed(() =>
    itineraries.value.reduce((sum, it) => sum + it.distanceKm, 0),
  );

  async function loadAll(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      itineraries.value = ItineraryService.getAll();
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  function getById(id: string): Itinerary | null {
    return itineraries.value.find((it) => it.id === id) ?? null;
  }

  function create(itinerary: Omit<Itinerary, "id">): Itinerary {
    const created = ItineraryService.create(itinerary);
    itineraries.value.push(created);
    return created;
  }

  function update(id: string, updates: Partial<Itinerary>): Itinerary | null {
    const updated = ItineraryService.update(id, updates);
    if (updated) {
      const idx = itineraries.value.findIndex((it) => it.id === id);
      if (idx !== -1) itineraries.value[idx] = updated;
    }
    return updated;
  }

  function remove(id: string): boolean {
    const ok = ItineraryService.delete(id);
    if (ok) {
      itineraries.value = itineraries.value.filter((it) => it.id !== id);
    }
    return ok;
  }

  function toggleFavorite(id: string): void {
    ItineraryService.toggleFavorite(id);
    const it = itineraries.value.find((i) => i.id === id);
    if (it) it.isFavorite = !it.isFavorite;
  }

  return {
    itineraries,
    summaries,
    recommended,
    favorites,
    totalDistance,
    isLoading,
    error,
    loadAll,
    getById,
    create,
    update,
    remove,
    toggleFavorite,
  };
});
