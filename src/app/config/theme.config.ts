import type { ThemeConfig, ThemePalette } from "@/models/theme.model";

/**
 * Moto-themed palette — inspired by the touring / motorcycling world.
 * Black / anthracite / grey / white with orange accent.
 */
const motoPalette: ThemePalette = {
  primary: "#0f172a", // anthracite
  secondary: "#1e293b", // dark grey
  accent: "#f97316", // orange
  background: "#0b1120", // near-black
  surface: "#1e2937", // card surface
  text: "#f9fafb", // light text
  muted: "#94a3b8", // grey text
  border: "#334155", // border
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#38bdf8",
};

export const themeConfig: ThemeConfig = {
  name: "moto",
  mode: "dark",
  palette: motoPalette,
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  borderRadius: "0.5rem",
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
  },
};

/**
 * Alternative palettes for other white-label clients.
 * Swap `themeConfig.palette` to switch themes.
 */
export const alternativePalettes: Record<string, ThemePalette> = {
  office: {
    primary: "#1e3a8a",
    secondary: "#3730a3",
    accent: "#f59e0b",
    background: "#f8fafc",
    surface: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    border: "#e2e8f0",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#38bdf8",
  },
  tour: {
    primary: "#065f46",
    secondary: "#0c4a6e",
    accent: "#d97706",
    background: "#f0fdf4",
    surface: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    border: "#d1fae5",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#38bdf8",
  },
  electrician: {
    primary: "#1e40af",
    secondary: "#5b21b6",
    accent: "#f59e0b",
    background: "#0f172a",
    surface: "#1e2937",
    text: "#f9fafb",
    muted: "#94a3b8",
    border: "#334155",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#38bdf8",
  },
};
