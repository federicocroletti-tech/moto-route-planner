import { ref, computed, watch } from "vue";
import type { Itinerary } from "@/models/itinerary.model";
import type {
  Difficulty,
  RideType,
  RecommendedPeriod,
} from "@/models/itinerary.model";

export interface FilterState {
  search: string;
  difficulty: Difficulty | "";
  rideType: RideType | "";
  maxDuration: string;
  period: RecommendedPeriod | "";
}

export type SortKey = "distance" | "duration" | "difficulty" | "name";
export type SortOrder = "asc" | "desc";

const difficultyOrder: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const filters = ref<FilterState>({
  search: "",
  difficulty: "",
  rideType: "",
  maxDuration: "",
  period: "",
});

const sortKey = ref<SortKey>("name");
const sortOrder = ref<SortOrder>("asc");

export function useItineraryFilters(source: () => Itinerary[] = () => []) {
  const filtered = computed(() => {
    let result = source();

    // Text search
    if (filters.value.search.trim()) {
      const term = filters.value.search.toLowerCase().trim();
      result = result.filter(
        (it) =>
          it.title.toLowerCase().includes(term) ||
          it.shortDescription.toLowerCase().includes(term),
      );
    }

    // Difficulty
    if (filters.value.difficulty) {
      result = result.filter(
        (it) => it.difficulty === filters.value.difficulty,
      );
    }

    // Ride type
    if (filters.value.rideType) {
      result = result.filter((it) => it.rideType === filters.value.rideType);
    }

    // Max duration (parse "4h 30m" → minutes)
    if (filters.value.maxDuration) {
      const maxMin = parseDurationToMinutes(filters.value.maxDuration);
      result = result.filter((it) => {
        const itMin = parseDurationToMinutes(it.estimatedDuration);
        return itMin <= maxMin;
      });
    }

    // Period
    if (filters.value.period) {
      result = result.filter(
        (it) => it.recommendedPeriod === filters.value.period,
      );
    }

    // Sorting
    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortKey.value) {
        case "distance":
          cmp = a.distanceKm - b.distanceKm;
          break;
        case "duration":
          cmp =
            parseDurationToMinutes(a.estimatedDuration) -
            parseDurationToMinutes(b.estimatedDuration);
          break;
        case "difficulty":
          cmp = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case "name":
          cmp = a.title.localeCompare(b.title);
          break;
      }
      return sortOrder.value === "asc" ? cmp : -cmp;
    });

    return result;
  });

  function parseDurationToMinutes(duration: string): number {
    const hMatch = duration.match(/(\d+)h/);
    const mMatch = duration.match(/(\d+)m/);
    const hours = hMatch ? parseInt(hMatch[1], 10) : 0;
    const minutes = mMatch ? parseInt(mMatch[1], 10) : 0;
    return hours * 60 + minutes;
  }

  function setFilter<K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ): void {
    filters.value[key] = value;
  }

  function resetFilters(): void {
    filters.value = {
      search: "",
      difficulty: "",
      rideType: "",
      maxDuration: "",
      period: "",
    };
  }

  function setSort(key: SortKey, order: SortOrder = "asc"): void {
    sortKey.value = key;
    sortOrder.value = order;
  }

  function toggleSortOrder(): void {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  }

  // Expose for external sync (e.g. URL query params)
  watch(
    () => ({ ...filters.value }),
    () => {
      // Filters changed — filtered computed will recompute automatically
    },
  );

  return {
    filters,
    sortKey,
    sortOrder,
    filtered,
    setFilter,
    resetFilters,
    setSort,
    toggleSortOrder,
  };
}
