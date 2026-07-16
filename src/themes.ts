export type ButtonThemeSlot = {
  bg: string;
  text: string;
  border: string;
  shadow: string;
  shadowValue?: string;
  pattern?: string;
  patternSize?: string;
  patternOpacity?: number;
};

export type ButtonTheme = {
  default: ButtonThemeSlot;
  primary: ButtonThemeSlot;
  success: ButtonThemeSlot;
  danger: ButtonThemeSlot;
  warning: ButtonThemeSlot;
  outline: ButtonThemeSlot;
  ghost: ButtonThemeSlot;
};

export type ComixaThemeName =
  | "default"
  | "retro"
  | "pop-art"
  | "manga"
  | "vintage";

export const defaultTheme = {
  default: {
    bg: "#FFD84D",
    text: "#111111",
    border: "#1E1E1E",
    shadow: "#1E1E1E",
  },
  primary: {
    bg: "#4F9CF9",
    text: "#FFFFFF",
    border: "#1E1E1E",
    shadow: "#1E1E1E",
  },
  success: {
    bg: "#4ADE80",
    text: "#111111",
    border: "#1E1E1E",
    shadow: "#1E1E1E",
  },
  danger: {
    bg: "#FF5757",
    text: "#FFFFFF",
    border: "#1E1E1E",
    shadow: "#1E1E1E",
  },
  warning: {
    bg: "#FFD84D",
    text: "#111111",
    border: "#1E1E1E",
    shadow: "#1E1E1E",
  },
  outline: {
    bg: "#FFFFFF",
    text: "#111111",
    border: "#1E1E1E",
    shadow: "#1E1E1E",
  },
  ghost: {
    bg: "transparent",
    text: "#111111",
    border: "transparent",
    shadow: "transparent",
  },
} satisfies ButtonTheme;

export const retroTheme = {
  default: {
    bg: "#D9A441",
    text: "#3B2B22",
    border: "#3B2B22",
    shadow: "#3B2B22",
  },
  primary: {
    bg: "#6C8EBF",
    text: "#FFF8E8",
    border: "#3B2B22",
    shadow: "#3B2B22",
  },
  success: {
    bg: "#7A9E5F",
    text: "#FFF8E8",
    border: "#3B2B22",
    shadow: "#3B2B22",
  },
  danger: {
    bg: "#C66A4A",
    text: "#FFF8E8",
    border: "#3B2B22",
    shadow: "#3B2B22",
  },
  warning: {
    bg: "#D9A441",
    text: "#3B2B22",
    border: "#3B2B22",
    shadow: "#3B2B22",
  },
  outline: {
    bg: "#F4E2B6",
    text: "#3B2B22",
    border: "#3B2B22",
    shadow: "#3B2B22",
  },
  ghost: {
    bg: "transparent",
    text: "#3B2B22",
    border: "transparent",
    shadow: "transparent",
  },
} satisfies ButtonTheme;

export const popArtTheme = {
  default: {
    bg: "#FFE14D",
    text: "#111111",
    border: "#111111",
    shadow: "#FF4FA3",
  },
  primary: {
    bg: "#3B82F6",
    text: "#FFFFFF",
    border: "#111111",
    shadow: "#FFD400",
  },
  success: {
    bg: "#22C55E",
    text: "#111111",
    border: "#111111",
    shadow: "#FFD400",
  },
  danger: {
    bg: "#FF4B4B",
    text: "#FFFFFF",
    border: "#111111",
    shadow: "#FFD400",
  },
  warning: {
    bg: "#FFE14D",
    text: "#111111",
    border: "#111111",
    shadow: "#FF4FA3",
  },
  outline: {
    bg: "#FFFFFF",
    text: "#111111",
    border: "#111111",
    shadow: "#FFD400",
  },
  ghost: {
    bg: "transparent",
    text: "#111111",
    border: "transparent",
    shadow: "transparent",
  },
} satisfies ButtonTheme;

export const mangaTheme = {
  default: {
    bg: "#F7F7F7",
    text: "#111111",
    border: "#111111",
    shadow: "#111111",
    pattern:
      "repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(0,0,0,0.34) 6px, rgba(0,0,0,0.34) 7px)",
    patternSize: "12px 100%",
    patternOpacity: 0.42,
  },
  primary: {
    bg: "#FFFFFF",
    text: "#111111",
    border: "#111111",
    shadow: "#111111",
    pattern:
      "repeating-linear-gradient(110deg, transparent 0, transparent 8px, rgba(0,0,0,0.34) 9px, transparent 10px)",
    patternSize: "18px 100%",
    patternOpacity: 0.52,
  },
  success: {
    bg: "#ECECEC",
    text: "#111111",
    border: "#111111",
    shadow: "#111111",
    pattern:
      "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.42) 1.4px, transparent 0)",
    patternSize: "8px 8px",
    patternOpacity: 0.38,
  },
  danger: {
    bg: "#DDDDDD",
    text: "#111111",
    border: "#111111",
    shadow: "#111111",
    pattern:
      "repeating-linear-gradient(-35deg, transparent 0, transparent 5px, rgba(0,0,0,0.26) 5px, rgba(0,0,0,0.26) 6px, transparent 6px, transparent 11px), repeating-linear-gradient(35deg, transparent 0, transparent 5px, rgba(0,0,0,0.18) 5px, rgba(0,0,0,0.18) 6px, transparent 6px, transparent 11px)",
    patternSize: "auto",
    patternOpacity: 0.45,
  },
  warning: {
    bg: "#F7F7F7",
    text: "#111111",
    border: "#111111",
    shadow: "#111111",
    pattern:
      "repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(0,0,0,0.34) 6px, rgba(0,0,0,0.34) 7px)",
    patternSize: "12px 100%",
    patternOpacity: 0.42,
  },
  outline: {
    bg: "transparent",
    text: "#111111",
    border: "#111111",
    shadow: "#111111",
  },
  ghost: {
    bg: "transparent",
    text: "#111111",
    border: "transparent",
    shadow: "transparent",
  },
} satisfies ButtonTheme;

export const vintageTheme = {
  default: {
    bg: "#E5C37A",
    text: "#4A3A2A",
    border: "#4A3A2A",
    shadow: "#4A3A2A",
  },
  primary: {
    bg: "#D7C2A5",
    text: "#7B2D26",
    border: "#4A3A2A",
    shadow: "#4A3A2A",
  },
  success: {
    bg: "#BFC8A6",
    text: "#4A3A2A",
    border: "#4A3A2A",
    shadow: "#4A3A2A",
  },
  danger: {
    bg: "#C9997B",
    text: "#4A3A2A",
    border: "#4A3A2A",
    shadow: "#4A3A2A",
  },
  warning: {
    bg: "#E5C37A",
    text: "#4A3A2A",
    border: "#4A3A2A",
    shadow: "#4A3A2A",
  },
  outline: {
    bg: "#F7EED8",
    text: "#7B2D26",
    border: "#4A3A2A",
    shadow: "#4A3A2A",
  },
  ghost: {
    bg: "transparent",
    text: "#7B2D26",
    border: "transparent",
    shadow: "transparent",
  },
} satisfies ButtonTheme;

export const comixaThemes = {
  default: defaultTheme,
  retro: retroTheme,
  "pop-art": popArtTheme,
  manga: mangaTheme,
  vintage: vintageTheme,
} satisfies Record<ComixaThemeName, ButtonTheme>;
