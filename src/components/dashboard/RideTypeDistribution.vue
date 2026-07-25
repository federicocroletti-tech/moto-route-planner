<template>
  <div class="bg-surface border border-border rounded-lg p-4">
    <h3 class="text-sm font-semibold text-text mb-4">
      {{ t("dashboard.byRideType") }}
    </h3>
    <div class="space-y-2">
      <div
        v-for="item in data"
        :key="item.label"
        class="flex items-center gap-2"
      >
        <span class="text-xs text-muted w-20">{{ item.label }}</span>
        <div class="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            class="h-full rounded-full"
            :class="item.color"
            :style="{ width: item.percent + '%' }"
          ></div>
        </div>
        <span class="text-xs text-muted w-6 text-right">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps<{
  data: Array<{ label: string; count: number; percent: number; color: string }>;
}>();

const { t } = useI18n();
</script>
