<template>
  <div class="relative">
    <button
      class="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm hover:bg-secondary transition-colors"
      @click="open = !open"
    >
      <span class="uppercase">{{ locale }}</span>
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-24 bg-surface border border-border rounded-lg shadow-lg z-50"
      >
        <button
          v-for="lang in availableLocales"
          :key="lang"
          class="block w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg"
          @click="switchLocale(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { setLocale as i18nSetLocale, getAvailableLocales } from "@/i18n";

const { locale } = useI18n();
const open = ref(false);
const availableLocales = computed(() => getAvailableLocales());

function switchLocale(lang: string) {
  i18nSetLocale(lang);
  locale.value = lang;
  open.value = false;
}
</script>
