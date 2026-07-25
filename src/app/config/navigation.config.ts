import type { NavigationItem } from "@/models/client-config.model";

/**
 * Navigation items for the main header / sidebar.
 *
 * `requiresAuth` — if true, the route is protected by the auth guard.
 * `requiredRole`  — optional role check (guest | rider | admin).
 */
export const navigationItems: NavigationItem[] = [
  {
    key: "home",
    label: "nav.home",
    path: "/",
    icon: "home",
    requiresAuth: false,
  },
  {
    key: "itineraries",
    label: "nav.itineraries",
    path: "/itineraries",
    icon: "route",
    requiresAuth: false,
  },
  {
    key: "create",
    label: "nav.create",
    path: "/create",
    icon: "plus",
    requiresAuth: true,
    requiredRole: "rider",
  },
  {
    key: "dashboard",
    label: "nav.dashboard",
    path: "/dashboard",
    icon: "chart-bar",
    requiresAuth: true,
    requiredRole: "admin",
  },
  {
    key: "favorites",
    label: "nav.favorites",
    path: "/favorites",
    icon: "heart",
    requiresAuth: true,
    requiredRole: "rider",
  },
  {
    key: "profile",
    label: "nav.profile",
    path: "/profile",
    icon: "user",
    requiresAuth: true,
  },
  {
    key: "about",
    label: "nav.about",
    path: "/about",
    icon: "info",
    requiresAuth: false,
  },
];
