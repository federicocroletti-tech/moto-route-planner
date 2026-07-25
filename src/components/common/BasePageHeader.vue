<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-text mb-2">{{ title }}</h1>
    <p v-if="subtitle" class="text-muted">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>();
</script>
