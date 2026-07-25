<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <slot v-if="loading" class="flex items-center">
      <svg
        class="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>{{ loadingText || t("common.loading") }}</span>
    </slot>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
    size?: "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
  }>(),
  {
    variant: "primary",
    size: "md",
    type: "button",
    disabled: false,
    loading: false,
    loadingText: "",
  },
);

defineEmits<{
  click: [event: MouseEvent];
}>();

const { t } = useI18n();

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "px-4 py-2 text-sm";
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "bg-secondary text-text hover:bg-border";
    case "ghost":
      return "text-text hover:bg-secondary";
    case "danger":
      return "bg-danger text-background hover:bg-danger/80";
    case "success":
      return "bg-success text-background hover:bg-success/80";
    default:
      return "bg-accent text-background hover:bg-accent/80";
  }
});
</script>
