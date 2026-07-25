<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-muted mb-1"
      >{{ label }}</label
    >
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :step="step"
      :disabled="disabled"
      :required="required"
      class="w-full rounded-lg border border-border bg-surface text-text placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      :class="[
        sizeClass,
        error ? 'border-danger focus:border-danger focus:ring-danger' : '',
      ]"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <p v-if="error" class="mt-1 text-sm text-danger">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    id?: string;
    type?: string;
    modelValue?: string | number;
    label?: string;
    placeholder?: string;
    step?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    id: "",
    type: "text",
    modelValue: "",
    label: "",
    placeholder: "",
    step: undefined,
    disabled: false,
    required: false,
    error: "",
    size: "md",
  },
);
defineEmits<{
  "update:modelValue": [value: string];
}>();
const sizeClass = computed(
  () =>
    ({ sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-4 py-3 text-lg" })[
      props.size
    ],
);
</script>
