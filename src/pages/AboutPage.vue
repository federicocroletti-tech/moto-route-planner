<template>
  <div class="page-container max-w-4xl">
    <BasePageHeader :title="t('about.title')" :subtitle="t('about.subtitle')" />
    <div class="prose prose-invert max-w-none space-y-6">
      <section class="bg-surface border border-border rounded-lg p-6">
        <h2 class="text-xl font-bold text-text mb-4">{{ t("about.goal") }}</h2>
        <p class="text-muted leading-relaxed">{{ t("about.goalText") }}</p>
      </section>
      <section class="bg-surface border border-border rounded-lg p-6">
        <h2 class="text-xl font-bold text-text mb-4">
          {{ t("about.techStack") }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div
            v-for="tech in techStack"
            :key="tech"
            class="bg-secondary rounded-lg px-3 py-2 text-sm text-text"
          >
            {{ tech }}
          </div>
        </div>
      </section>
      <section class="bg-surface border border-border rounded-lg p-6">
        <h2 class="text-xl font-bold text-text mb-4">
          {{ t("about.features") }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="(feat, i) in features"
            :key="i"
            class="text-muted flex items-start gap-2"
          >
            <span class="text-accent mt-1">•</span>{{ feat }}
          </li>
        </ul>
      </section>
      <section class="bg-surface border border-border rounded-lg p-6">
        <h2 class="text-xl font-bold text-text mb-4">
          {{ t("about.future") }}
        </h2>
        <p class="text-muted leading-relaxed">{{ t("about.futureText") }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BasePageHeader from "@/components/common/BasePageHeader.vue";
const { t } = useI18n();
const techStack = [
  "Vue 3",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "SCSS",
  "Pinia",
  "Vue Router",
  "Vue I18n",
  "Keycloak",
  "Leaflet",
  "OpenStreetMap",
  "ESLint",
  "Prettier",
];
const features = [
  t("about.feature1"),
  t("about.feature2"),
  t("about.feature3"),
  t("about.feature4"),
  t("about.feature5"),
  t("about.feature6"),
];
</script>
