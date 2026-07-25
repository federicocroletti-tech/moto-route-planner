import type { User } from "./user.model";

export type AuthMode = "mock" | "keycloak";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  mode: AuthMode;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}

export interface AuthConfig {
  mode: AuthMode;
  keycloak: KeycloakConfig;
  mockUser: User;
}
