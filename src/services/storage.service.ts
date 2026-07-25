/**
 * Thin wrapper around localStorage with JSON serialisation
 * and graceful fallback when localStorage is unavailable.
 */
export class StorageService {
  private static isAvailable(): boolean {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static get<T>(key: string, fallback: T): T {
    if (!this.isAvailable()) return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  static set<T>(key: string, value: T): void {
    if (!this.isAvailable()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // silently ignore quota errors
    }
  }

  static remove(key: string): void {
    if (!this.isAvailable()) return;
    localStorage.removeItem(key);
  }

  static clear(): void {
    if (!this.isAvailable()) return;
    localStorage.clear();
  }
}
