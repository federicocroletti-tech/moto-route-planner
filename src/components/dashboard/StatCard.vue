<template>
  <div class="bg-surface border border-border rounded-lg p-6">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm text-muted">{{ label }}</span>
      <div
        v-if="icon"
        class="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center"
      >
        <span class="text-accent text-lg">{{ icon }}</span>
      </div>
    </div>
    <p class="text-2xl font-bold text-text">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; icon?: string }>();
</script>
