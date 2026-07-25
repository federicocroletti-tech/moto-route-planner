<template>
  <BaseButton variant="ghost" @click="handleLogout">
    {{ t("auth.logout") }}
  </BaseButton>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/common/BaseButton.vue";

const { t } = useI18n();
const { logout } = useAuth();

function handleLogout() {
  logout();
}
</script>
