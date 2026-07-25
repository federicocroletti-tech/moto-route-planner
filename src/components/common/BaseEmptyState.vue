<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <svg
      class="w-12 h-12 text-muted mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 6h.01M15 6h.01"
      />
    </svg>
    <h3 class="text-lg font-medium text-text mb-2">{{ title }}</h3>
    <p class="text-sm text-muted">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; message: string }>();
</script>
