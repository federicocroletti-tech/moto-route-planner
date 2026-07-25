<template>
  <footer class="bg-surface border-t border-border py-6">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted"
    >
      {{ appConfig.footerText }}
    </div>
  </footer>
</template>

<script setup lang="ts">
import { appConfig } from "@/app/config/app.config";
</script>
