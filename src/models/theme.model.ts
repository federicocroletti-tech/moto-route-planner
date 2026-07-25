export type ThemeName =
  "moto" | "office" | "tour" | "electrician" | "accountant" | "custom";

export type ThemeMode = "light" | "dark" | "auto";

export interface ThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface ThemeConfig {
  name: ThemeName;
  mode: ThemeMode;
  palette: ThemePalette;
  fontFamily: string;
  borderRadius: string;
  spacing: Record<string, string>;
  shadows: Record<string, string>;
}
