<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-muted mb-1"
      >{{ label }}</label
    >
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      class="w-full rounded-lg border border-border bg-surface text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string;
    modelValue?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    options: { value: string; label: string }[];
  }>(),
  {
    id: "",
    modelValue: "",
    label: "",
    placeholder: "",
    disabled: false,
  },
);
defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
