export type ThemeName = "light" | "dark";

export const THEMES: Record<ThemeName, Record<string, string>> = {
  light: {
    bg:          "#ffffff",
    surface:     "#f7f6f3",
    card:        "#ffffff",
    cardHover:   "#f1f1ef",
    border:      "#e9e9e7",
    borderHover: "#dfdfde",
    text:        "#37352f",
    muted:       "#787774",
  },
  dark: {
    bg:          "#0d0d0d",
    surface:     "#171717",
    card:        "#212121",
    cardHover:   "#2a2a2a",
    border:      "#3a3a3a",
    borderHover: "#4d4d4d",
    text:        "#ececec",
    muted:       "#8e8e8e",
  }
};

export type SubjectColor = 'gray' | 'blue' | 'green' | 'purple' | 'amber';

export type ColorValue = {
  bg: string;
  text: string;
  border: string;
};

export const COLOR_MAP: Record<SubjectColor, ColorValue> = {
  gray: {
    bg:     "var(--card-gray-bg)",
    text:   "var(--card-gray-text)",
    border: "var(--card-gray-border)",
  },
  blue: {
    bg:     "var(--card-blue-bg)",
    text:   "var(--card-blue-text)",
    border: "var(--card-blue-border)",
  },
  green: {
    bg:     "var(--card-green-bg)",
    text:   "var(--card-green-text)",
    border: "var(--card-green-border)",
  },
  purple: {
    bg:     "var(--card-purple-bg)",
    text:   "var(--card-purple-text)",
    border: "var(--card-purple-border)",
  },
  amber: {
    bg:     "var(--card-amber-bg)",
    text:   "var(--card-amber-text)",
    border: "var(--card-amber-border)",
  },
};
