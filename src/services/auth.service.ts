import type { User } from "@/models/user.model";
import { authConfig } from "@/app/config/auth.config";
import { MockAuthService } from "./mock-auth.service";
import { KeycloakService } from "./keycloak.service";

/**
 * Unified authentication service.
 *
 * Delegates to either MockAuthService or KeycloakService
 * based on the VITE_AUTH_MODE environment variable.
 */
export class AuthService {
  static get mode() {
    return authConfig.mode;
  }

  static async init(): Promise<boolean> {
    if (this.mode === "keycloak") {
      return KeycloakService.init();
    }
    // Mock mode: no init needed, session is read from localStorage
    return MockAuthService.isAuthenticated();
  }

  static login(): { user: User; token: string } | void {
    if (this.mode === "keycloak") {
      return KeycloakService.login();
    }
    return MockAuthService.login();
  }

  static logout(): void {
    if (this.mode === "keycloak") {
      return KeycloakService.logout();
    }
    return MockAuthService.logout();
  }

  static getSession(): { user: User | null; token: string | null } {
    if (this.mode === "keycloak") {
      return {
        user: KeycloakService.getUser(),
        token: KeycloakService.getToken(),
      };
    }
    return MockAuthService.getSession();
  }

  static isAuthenticated(): boolean {
    if (this.mode === "keycloak") {
      return KeycloakService.isAuthenticated();
    }
    return MockAuthService.isAuthenticated();
  }
}
