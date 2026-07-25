import type { RouteRecordRaw } from "vue-router";
import AppLayout from "@/app/layouts/AppLayout.vue";
import AuthLayout from "@/app/layouts/AuthLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import ItinerariesPage from "@/pages/ItinerariesPage.vue";
import ItineraryDetailPage from "@/pages/ItineraryDetailPage.vue";
import CreateItineraryPage from "@/pages/CreateItineraryPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import FavoritesPage from "@/pages/FavoritesPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomePage,
        meta: { requiresAuth: false },
      },
      {
        path: "itineraries",
        name: "itineraries",
        component: ItinerariesPage,
        meta: { requiresAuth: false },
      },
      {
        path: "itinerary/:id",
        name: "itinerary-detail",
        component: ItineraryDetailPage,
        meta: { requiresAuth: false },
        props: true,
      },
      {
        path: "create",
        name: "create",
        component: CreateItineraryPage,
        meta: { requiresAuth: true, requiredRole: "rider" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardPage,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "favorites",
        name: "favorites",
        component: FavoritesPage,
        meta: { requiresAuth: true, requiredRole: "rider" },
      },
      {
        path: "profile",
        name: "profile",
        component: ProfilePage,
        meta: { requiresAuth: true },
      },
      {
        path: "about",
        name: "about",
        component: AboutPage,
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/pages/LoginPage.vue"),
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
    meta: { requiresAuth: false },
  },
];
