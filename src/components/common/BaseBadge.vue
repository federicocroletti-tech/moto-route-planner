<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variantClass,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    variant?: "default" | "success" | "warning" | "danger" | "info" | "accent";
  }>(),
  { variant: "default" },
);
const variantClass = computed(() => {
  const map = {
    default: "bg-secondary text-text",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    danger: "bg-danger/20 text-danger",
    info: "bg-info/20 text-info",
    accent: "bg-accent/20 text-accent",
  };
  return map[props.variant];
});
</script>
