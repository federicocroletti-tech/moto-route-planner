<template>
  <div class="space-y-3">
    <div
      v-for="(stop, index) in stops"
      :key="stop.id"
      class="relative flex items-start gap-4"
    >
      <div
        class="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-background font-bold text-sm z-10"
      >
        {{ index + 1 }}
      </div>
      <div class="flex-1 bg-surface border border-border rounded-lg p-4">
        <div class="flex items-start justify-between">
          <div>
            <h4 class="text-sm font-semibold text-text">{{ stop.name }}</h4>
            <p class="text-xs text-muted mt-1">{{ stop.description }}</p>
          </div>
          <BaseBadge :variant="badgeVariant(stop.type)">
            {{ t(`stopType.${stop.type}`) }}
          </BaseBadge>
        </div>
        <div class="mt-2 flex items-center gap-2 text-xs text-muted">
          <span
            >{{ stop.latitude.toFixed(4) }},
            {{ stop.longitude.toFixed(4) }}</span
          >
          <span v-if="stop.estimatedTimeFromPrevious"
            >· {{ stop.estimatedTimeFromPrevious }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BaseBadge from "@/components/common/BaseBadge.vue";
import type { ItineraryStop, StopType } from "@/models/stop.model";

defineProps<{ stops: ItineraryStop[] }>();
const { t } = useI18n();

function badgeVariant(
  type: StopType,
): "info" | "default" | "success" | "warning" | "danger" | "accent" {
  const map: Record<
    StopType,
    "info" | "default" | "success" | "warning" | "danger" | "accent"
  > = {
    start: "info",
    saddle: "default",
    panorama: "success",
    lunch: "warning",
    gas: "danger",
    end: "accent",
  };
  return map[type];
}
</script>
