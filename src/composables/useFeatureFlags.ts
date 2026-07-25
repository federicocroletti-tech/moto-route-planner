import { featureFlags } from "@/app/config/feature-flags.config";
import type { FeatureFlags } from "@/models/client-config.model";

/**
 * Composable for feature flag access.
 * Returns the global feature flags object.
 */
export function useFeatureFlags(): FeatureFlags {
  return featureFlags;
}
