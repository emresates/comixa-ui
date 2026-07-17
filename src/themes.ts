import type * as React from "react";

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

type CssVars = React.CSSProperties & Record<`--${string}`, string | number>;

type ThemeMeta = {
  font: string;
  radius: string;
  borderWidth: string;
  letterSpacing: string;
  fontWeight?: number;
  fieldFont: string;
  fieldBg: string;
  fieldFilledBg: string;
  fieldGhostBg: string;
  fieldText: string;
  fieldPlaceholder: string;
  fieldBorder: string;
  fieldShadow: string;
  fieldShadowValue: string;
  fieldFocusShadow: string;
  fieldErrorBorder: string;
  fieldErrorShadow: string;
  fieldSuccessBorder: string;
  fieldSuccessShadow: string;
  selectBg?: string;
  selectFilledBg?: string;
  selectGhostBg?: string;
  selectMenuBg?: string;
  selectMenuBorder?: string;
  selectMenuShadow?: string;
  ribbonShadow: string;
  ribbonLetterSpacing: string;
  ribbonTextTransform: "uppercase" | "none";
};

const themeMeta: Record<ComixaThemeName, ThemeMeta> = {
  default: {
    font: `"Bangers", "Comic Sans MS", cursive`,
    radius: "0.5rem",
    borderWidth: "2px",
    letterSpacing: "0.025em",
    fieldFont: `"Comic Neue", ui-rounded, system-ui, sans-serif`,
    fieldBg: "#FFFDF5",
    fieldFilledBg: "#FFF3D6",
    fieldGhostBg: "transparent",
    fieldText: "#111111",
    fieldPlaceholder: "#5C5C5C",
    fieldBorder: "#1E1E1E",
    fieldShadow: "#1E1E1E",
    fieldShadowValue: "3px 3px 0 #1E1E1E",
    fieldFocusShadow: "4px 4px 0 #1E1E1E",
    fieldErrorBorder: "#FF5757",
    fieldErrorShadow: "4px 4px 0 #FF5757",
    fieldSuccessBorder: "#4ADE80",
    fieldSuccessShadow: "4px 4px 0 #4ADE80",
    ribbonShadow: "3px 3px 0 #1A1A1A",
    ribbonLetterSpacing: "0.025em",
    ribbonTextTransform: "uppercase",
  },
  retro: {
    font: `"Lilita One", "Comic Sans MS", cursive`,
    radius: "0.85rem",
    borderWidth: "2px",
    letterSpacing: "0",
    fieldFont: `"Lilita One", "Comic Sans MS", cursive`,
    fieldBg: "#f3dfbd",
    fieldFilledBg: "#deb16d",
    fieldGhostBg: "rgba(244, 226, 182, 0.36)",
    fieldText: "#2b1d13",
    fieldPlaceholder: "#68472b",
    fieldBorder: "#5b3a1f",
    fieldShadow: "#7a4d24",
    fieldShadowValue: "2px 2px 0 #7a4d24",
    fieldFocusShadow: "3px 3px 0 #5b3a1f",
    fieldErrorBorder: "#c66a4a",
    fieldErrorShadow: "3px 3px 0 #c66a4a",
    fieldSuccessBorder: "#7a9e5f",
    fieldSuccessShadow: "3px 3px 0 #7a9e5f",
    ribbonShadow: "2px 2px 0 #7a4d24",
    ribbonLetterSpacing: "0",
    ribbonTextTransform: "uppercase",
  },
  "pop-art": {
    font: `"Baloo 2", "Bangers", Impact, sans-serif`,
    radius: "0.55rem",
    borderWidth: "2px",
    letterSpacing: "0.025em",
    fieldFont: `"Baloo 2", "Bangers", Impact, sans-serif`,
    fieldBg: "#fffdf5",
    fieldFilledBg: "#ffe14d",
    fieldGhostBg: "rgba(255, 255, 255, 0.5)",
    fieldText: "#111111",
    fieldPlaceholder: "#4a3a23",
    fieldBorder: "#111111",
    fieldShadow: "#ff4fa3",
    fieldShadowValue: "6px 6px 0 #ff4fa3",
    fieldFocusShadow: "7px 7px 0 #3b82f6",
    fieldErrorBorder: "#ff4b4b",
    fieldErrorShadow: "6px 6px 0 #ffd400",
    fieldSuccessBorder: "#22c55e",
    fieldSuccessShadow: "6px 6px 0 #ffd400",
    ribbonShadow: "6px 6px 0 #3b82f6",
    ribbonLetterSpacing: "0.055em",
    ribbonTextTransform: "uppercase",
  },
  manga: {
    font: `"Antonio", Impact, sans-serif`,
    radius: "0.2rem",
    borderWidth: "3px",
    letterSpacing: "0",
    fieldFont: `"Antonio", Impact, sans-serif`,
    fieldBg: "#ffffff",
    fieldFilledBg: "#ececec",
    fieldGhostBg: "transparent",
    fieldText: "#070707",
    fieldPlaceholder: "#555555",
    fieldBorder: "#070707",
    fieldShadow: "#000000",
    fieldShadowValue: "6px 6px 0 #000000",
    fieldFocusShadow: "8px 8px 0 #000000",
    fieldErrorBorder: "#111111",
    fieldErrorShadow: "6px 6px 0 #111111",
    fieldSuccessBorder: "#111111",
    fieldSuccessShadow: "6px 6px 0 #111111",
    selectBg: "#ffffff",
    selectFilledBg: "#ececec",
    selectGhostBg: "#f7f7f7",
    selectMenuBg: "#ffffff",
    selectMenuBorder: "#111111",
    selectMenuShadow: "6px 6px 0 #111111",
    ribbonShadow: "6px 6px 0 #111111",
    ribbonLetterSpacing: "0",
    ribbonTextTransform: "uppercase",
  },
  vintage: {
    font: `"Cormorant Garamond", Georgia, "Times New Roman", serif`,
    radius: "0.35rem",
    borderWidth: "1px",
    letterSpacing: "0.04em",
    fontWeight: 700,
    fieldFont: `"Cormorant Garamond", Georgia, "Times New Roman", serif`,
    fieldBg: "#f7eed8",
    fieldFilledBg: "#ead2a5",
    fieldGhostBg: "rgba(247, 238, 216, 0.45)",
    fieldText: "#4a3a2a",
    fieldPlaceholder: "#7b6651",
    fieldBorder: "#4a3a2a",
    fieldShadow: "#4a3a2a",
    fieldShadowValue: "1px 1px 0 #4a3a2a",
    fieldFocusShadow: "2px 2px 0 #24304f",
    fieldErrorBorder: "#7b2d26",
    fieldErrorShadow: "2px 2px 0 #7b2d26",
    fieldSuccessBorder: "#5b6a42",
    fieldSuccessShadow: "2px 2px 0 #5b6a42",
    ribbonShadow: "1px 1px 0 #4a3a2a",
    ribbonLetterSpacing: "0.06em",
    ribbonTextTransform: "uppercase",
  },
};

function shadowValue(slot: ButtonThemeSlot, fallback: string) {
  return slot.shadowValue ?? fallback.replace("__shadow__", slot.shadow);
}

function addSlotVars(vars: CssVars, name: keyof ButtonTheme, slot: ButtonThemeSlot) {
  vars[`--comixa-${name}-bg`] = slot.bg;
  vars[`--comixa-${name}-text`] = slot.text;
  vars[`--comixa-${name}-border`] = slot.border;
  vars[`--comixa-${name}-shadow`] = slot.shadow;
  vars[`--comixa-${name}-shadow-value`] = shadowValue(
    slot,
    name === "outline"
      ? "2px 2px 0 __shadow__"
      : "4px 4px 0 __shadow__"
  );
  vars[`--comixa-${name}-pattern`] = slot.pattern ?? "none";
  vars[`--comixa-${name}-pattern-size`] = slot.patternSize ?? "auto";
  vars[`--comixa-${name}-pattern-opacity`] = slot.patternOpacity ?? 0;
}

export function getComixaThemeStyle(theme: ComixaThemeName = "default"): CssVars {
  const tokens = comixaThemes[theme] ?? defaultTheme;
  const meta = themeMeta[theme] ?? themeMeta.default;
  const vars: CssVars = {
    "--comixa-button-font": meta.font,
    "--comixa-button-radius": meta.radius,
    "--comixa-button-border-width": meta.borderWidth,
    "--comixa-button-letter-spacing": meta.letterSpacing,
    "--comixa-field-bg": meta.fieldBg,
    "--comixa-field-filled-bg": meta.fieldFilledBg,
    "--comixa-field-ghost-bg": meta.fieldGhostBg,
    "--comixa-field-text": meta.fieldText,
    "--comixa-field-placeholder": meta.fieldPlaceholder,
    "--comixa-field-border": meta.fieldBorder,
    "--comixa-field-shadow": meta.fieldShadow,
    "--comixa-field-shadow-value": meta.fieldShadowValue,
    "--comixa-field-focus-shadow": meta.fieldFocusShadow,
    "--comixa-field-error-border": meta.fieldErrorBorder,
    "--comixa-field-error-shadow": meta.fieldErrorShadow,
    "--comixa-field-success-border": meta.fieldSuccessBorder,
    "--comixa-field-success-shadow": meta.fieldSuccessShadow,
    "--comixa-field-radius-sm": meta.radius,
    "--comixa-field-radius": meta.radius,
    "--comixa-field-radius-lg": meta.radius,
    "--comixa-field-font": meta.fieldFont,
    "--comixa-field-letter-spacing": meta.letterSpacing,
    "--comixa-ribbon-font": meta.font,
    "--comixa-ribbon-radius": meta.radius,
    "--comixa-ribbon-border": tokens.outline.border,
    "--comixa-ribbon-shadow": meta.ribbonShadow,
    "--comixa-ribbon-letter-spacing": meta.ribbonLetterSpacing,
    "--comixa-ribbon-text-transform": meta.ribbonTextTransform,
    "--comixa-ribbon-banner-bg": tokens.warning.bg,
    "--comixa-ribbon-banner-text": tokens.warning.text,
    "--comixa-ribbon-corner-bg": tokens.danger.bg,
    "--comixa-ribbon-corner-text": tokens.danger.text,
    "--comixa-ribbon-ticket-bg": tokens.outline.bg,
    "--comixa-ribbon-ticket-text": tokens.outline.text,
    "--comixa-ribbon-burst-bg": tokens.danger.bg,
    "--comixa-ribbon-burst-text": tokens.danger.text,
    "--comixa-select-bg": meta.selectBg ?? tokens.outline.bg,
    "--comixa-select-filled-bg": meta.selectFilledBg ?? tokens.default.bg,
    "--comixa-select-ghost-bg": meta.selectGhostBg ?? tokens.ghost.bg,
    "--comixa-select-menu-bg": meta.selectMenuBg ?? tokens.outline.bg,
    "--comixa-select-menu-border": meta.selectMenuBorder ?? tokens.outline.border,
    "--comixa-select-menu-shadow":
      meta.selectMenuShadow ?? shadowValue(tokens.outline, "4px 4px 0 __shadow__"),
    "--comixa-select-error-bg": tokens.danger.bg,
    "--comixa-select-error-text": tokens.danger.text,
    "--comixa-select-error-border": tokens.danger.border,
    "--comixa-select-error-shadow": shadowValue(tokens.danger, "4px 4px 0 __shadow__"),
    "--comixa-select-success-bg": tokens.success.bg,
    "--comixa-select-success-text": tokens.success.text,
    "--comixa-select-success-border": tokens.success.border,
    "--comixa-select-success-shadow": shadowValue(tokens.success, "4px 4px 0 __shadow__"),
  };

  if (meta.fontWeight) vars["--comixa-button-font-weight"] = meta.fontWeight;

  (Object.keys(tokens) as Array<keyof ButtonTheme>).forEach((slot) => {
    addSlotVars(vars, slot, tokens[slot]);
  });

  return vars;
}

export interface ThemeableProps {
  theme?: ComixaThemeName;
}

export function mergeComixaThemeStyle(
  theme: ComixaThemeName | undefined,
  style: React.CSSProperties | undefined
): React.CSSProperties | undefined {
  if (!theme) return style;
  return { ...getComixaThemeStyle(theme), ...style };
}
