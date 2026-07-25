import type { User } from "@/models/user.model";
import { authConfig } from "@/app/config/auth.config";
import { StorageService } from "./storage.service";

const TOKEN_KEY = "motoroute-mock-token";
const USER_KEY = "motoroute-mock-user";

/**
 * Simulated authentication service.
 *
 * When VITE_AUTH_MODE=mock, this service provides a fully functional
 * login/logout flow using a fake user and a fake JWT-like token.
 * All state is persisted to localStorage so the session survives reloads.
 */
export class MockAuthService {
  private static generateToken(): string {
    // A fake JWT-like string (not a real JWT, just for demo purposes)
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        sub: authConfig.mockUser.id,
        email: authConfig.mockUser.email,
        role: authConfig.mockUser.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      }),
    );
    const signature = btoa("mock-signature");
    return `${header}.${payload}.${signature}`;
  }

  static login(): { user: User; token: string } {
    const user: User = {
      ...authConfig.mockUser,
      lastLoginAt: new Date().toISOString(),
    };
    const token = this.generateToken();
    StorageService.set(TOKEN_KEY, token);
    StorageService.set(USER_KEY, user);
    return { user, token };
  }

  static logout(): void {
    StorageService.remove(TOKEN_KEY);
    StorageService.remove(USER_KEY);
  }

  static getSession(): { user: User | null; token: string | null } {
    const token = StorageService.get<string | null>(TOKEN_KEY, null);
    const user = StorageService.get<User | null>(USER_KEY, null);
    return { user, token };
  }

  static isAuthenticated(): boolean {
    const { token } = this.getSession();
    return token !== null;
  }
}
