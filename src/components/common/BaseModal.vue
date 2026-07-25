<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-surface border border-border rounded-lg shadow-xl w-full max-w-2xl mx-4"
      >
        <div v-if="$slots.header" class="px-6 py-4 border-b border-border">
          <slot name="header" />
        </div>
        <div class="px-6 py-4">
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="px-6 py-4 border-t border-border flex justify-end space-x-2"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>();
defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
</script>
