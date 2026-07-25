import type { User, UserProfile } from "@/models/user.model";

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

export const mockUserProfile: UserProfile = {
  ...mockUser,
  favoriteCount: 3,
  createdItineraryCount: 2,
};
