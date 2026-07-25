<template>
  <div
    :class="[
      'bg-surface border border-border rounded-lg shadow-md',
      paddingClass,
    ]"
  >
    <div v-if="$slots.header" class="px-6 py-4 border-b border-border">
      <slot name="header" />
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-border">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ padding?: "sm" | "md" | "lg" }>(), {
  padding: "md",
});
const paddingClass = { sm: "p-3", md: "p-4", lg: "p-6" }[props.padding];
</script>
