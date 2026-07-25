import type { AuthConfig } from "@/models/auth.model";
import type { User } from "@/models/user.model";

/**
 * Mock user used when VITE_AUTH_MODE=mock.
 * This simulates a logged-in "Rider Admin" user.
 */
export const mockUser: User = {
  id: "user-mock-001",
  username: "federico.demo",
  email: "federico.demo@example.com",
  firstName: "Federico",
  lastName: "Demo",
  role: "admin",
  preferredLanguage: "it",
  lastLoginAt: new Date().toISOString(),
  avatarUrl: undefined,
};

export const authConfig: AuthConfig = {
  mode: (import.meta.env.VITE_AUTH_MODE as "mock" | "keycloak") || "mock",
  keycloak: {
    url: import.meta.env.VITE_KEYCLOAK_URL || "http://localhost:8080",
    realm: import.meta.env.VITE_KEYCLOAK_REALM || "motoroute",
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "motoroute-frontend",
  },
  mockUser,
};
