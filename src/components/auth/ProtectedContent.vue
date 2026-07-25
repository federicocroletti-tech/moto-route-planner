<template>
  <slot v-if="canAccess" />
  <div v-else-if="showFallback" class="p-4 text-center text-muted">
    {{ t("auth.insufficientPermissions") }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useI18n } from "vue-i18n";

const props = withDefaults(
  defineProps<{
    requiredRole?: string;
    showFallback?: boolean;
  }>(),
  { requiredRole: "", showFallback: true },
);

const { t } = useI18n();
const { hasRole, isAuthenticated } = useAuth();

const canAccess = computed(() => {
  if (!isAuthenticated.value) return false;
  if (props.requiredRole && !hasRole(props.requiredRole)) return false;
  return true;
});
</script>
