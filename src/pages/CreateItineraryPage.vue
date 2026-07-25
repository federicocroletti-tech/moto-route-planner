<template>
  <div class="page-container">
    <BasePageHeader
      :title="t('itinerary.createTitle')"
      :subtitle="t('itinerary.createSubtitle')"
    />
    <ItineraryForm />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BasePageHeader from "@/components/common/BasePageHeader.vue";
import ItineraryForm from "@/components/itinerary/ItineraryForm.vue";
const { t } = useI18n();
</script>
