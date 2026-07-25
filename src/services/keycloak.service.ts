import Keycloak from "keycloak-js";
import type { User } from "@/models/user.model";
import { authConfig } from "@/app/config/auth.config";

/**
 * Keycloak authentication service.
 *
 * This service wraps the keycloak-js library and provides
 * login, logout, and token management.
 *
 * It is only used when VITE_AUTH_MODE=keycloak.
 * When Keycloak is not available, the app falls back to MockAuthService.
 */
export class KeycloakService {
  private static keycloak: Keycloak | null = null;

  static async init(): Promise<boolean> {
    this.keycloak = new Keycloak({
      url: authConfig.keycloak.url,
      realm: authConfig.keycloak.realm,
      clientId: authConfig.keycloak.clientId,
    });

    try {
      const authenticated = await this.keycloak.init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        pkceMethod: "S256",
      });
      return authenticated;
    } catch (error) {
      console.error("[KeycloakService] Init failed:", error);
      return false;
    }
  }

  static login(): void {
    if (!this.keycloak) {
      console.warn("[KeycloakService] Not initialized");
      return;
    }
    this.keycloak.login();
  }

  static logout(): void {
    if (!this.keycloak) {
      console.warn("[KeycloakService] Not initialized");
      return;
    }
    this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  static getToken(): string | null {
    return this.keycloak?.token ?? null;
  }

  static getUser(): User | null {
    if (!this.keycloak?.tokenParsed) return null;

    const parsed = this.keycloak.tokenParsed as Record<string, unknown>;
    return {
      id: (parsed.sub as string) ?? "",
      username: (parsed.preferred_username as string) ?? "",
      email: (parsed.email as string) ?? "",
      firstName: (parsed.given_name as string) ?? undefined,
      lastName: (parsed.family_name as string) ?? undefined,
      role: this.extractRole(parsed),
      preferredLanguage:
        (parsed.locale as string) ?? authConfig.mockUser.preferredLanguage,
      lastLoginAt: new Date().toISOString(),
      avatarUrl: (parsed.avatar_url as string) ?? undefined,
    };
  }

  private static extractRole(parsed: Record<string, unknown>): User["role"] {
    const roles = parsed.realm_access as { roles?: string[] } | undefined;
    if (roles?.roles?.includes("admin")) return "admin";
    if (roles?.roles?.includes("rider")) return "rider";
    return "guest";
  }

  static isAuthenticated(): boolean {
    return this.keycloak?.authenticated ?? false;
  }

  static isTokenExpired(): boolean {
    return this.keycloak?.isTokenExpired() ?? true;
  }
}
