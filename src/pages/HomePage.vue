<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative py-20 px-4 text-center bg-gradient-to-b from-primary to-background"
    >
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-text mb-6">
          {{ t("home.heroTitle") }}
        </h1>
        <p class="text-lg text-muted mb-8 max-w-2xl mx-auto">
          {{ t("home.heroSubtitle") }}
        </p>
        <div class="flex items-center justify-center gap-4">
          <router-link
            :to="{ name: 'itineraries' }"
            class="px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/80 transition-colors"
          >
            {{ t("home.explore") }}
          </router-link>
          <router-link
            :to="{ name: 'create' }"
            class="px-6 py-3 border border-border text-text rounded-lg font-medium hover:bg-secondary transition-colors"
          >
            {{ t("home.create") }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold text-text text-center mb-12">
          {{ t("home.whyChoose") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-surface border border-border rounded-lg p-6 text-center"
          >
            <div
              class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl">{{ benefit.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text mb-2">
              {{ benefit.title }}
            </h3>
            <p class="text-sm text-muted">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommended Itineraries -->
    <section class="py-16 px-4 bg-surface">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold text-text text-center mb-12">
          {{ t("home.recommended") }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ItineraryCard
            v-for="itinerary in recommended"
            :key="itinerary.id"
            :itinerary="itinerary"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-text mb-4">
          {{ t("home.ctaTitle") }}
        </h2>
        <p class="text-muted mb-8">{{ t("home.ctaSubtitle") }}</p>
        <router-link
          :to="{ name: 'itineraries' }"
          class="px-8 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/80 transition-colors"
        >
          {{ t("home.startExploring") }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useItineraryStore } from "@/stores/itinerary.store";
import ItineraryCard from "@/components/itinerary/ItineraryCard.vue";

const { t } = useI18n();
const itineraryStore = useItineraryStore();

const recommended = computed(() => itineraryStore.recommended.slice(0, 3));

const benefits = computed(() => [
  {
    icon: "🏞️",
    title: t("home.benefitScenic"),
    description: t("home.benefitScenicDesc"),
  },
  {
    icon: "📍",
    title: t("home.benefitCustom"),
    description: t("home.benefitCustomDesc"),
  },
  {
    icon: "📊",
    title: t("home.benefitDifficulty"),
    description: t("home.benefitDifficultyDesc"),
  },
  {
    icon: "📏",
    title: t("home.benefitDuration"),
    description: t("home.benefitDurationDesc"),
  },
]);
</script>
