<template>
  <div class="bg-surface border border-border rounded-lg p-8 text-center">
    <h1 class="text-2xl font-bold text-text mb-4">
      {{ t("auth.loginTitle") }}
    </h1>
    <p class="text-muted mb-6">{{ t("auth.loginDescription") }}</p>
    <LoginButton />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import LoginButton from "@/components/auth/LoginButton.vue";
const { t } = useI18n();
</script>
