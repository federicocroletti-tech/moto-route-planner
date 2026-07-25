export type UserRole = "guest" | "rider" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  preferredLanguage: string;
  lastLoginAt: string;
  avatarUrl?: string;
}

export interface UserProfile extends User {
  favoriteCount: number;
  createdItineraryCount: number;
}
