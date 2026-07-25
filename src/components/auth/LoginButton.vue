<template>
  <BaseButton :loading="loading" variant="primary" @click="handleLogin">
    {{ t("auth.login") }}
  </BaseButton>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/common/BaseButton.vue";

const { t } = useI18n();
const { login } = useAuth();
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  await login();
  loading.value = false;
}
</script>
