import * as React from "react";
import {
  getComixaThemeStyle,
  type ComixaThemeName,
} from "./themes";
import { cn } from "./lib/cn";

const THEME_STYLE_ID = "comixa-theme-runtime";

const THEME_RUNTIME_CSS = `
[data-comixa-theme] [data-comixa-badge],
[data-comixa-theme][data-comixa-badge] { color: var(--comixa-badge-text); }
[data-comixa-theme] [data-comixa-sound-badge],
[data-comixa-theme][data-comixa-sound-badge] { color: var(--comixa-sound-text); }
[data-comixa-theme] [data-comixa-sticker],
[data-comixa-theme][data-comixa-sticker] { color: var(--comixa-sticker-text); }
[data-comixa-theme] [data-comixa-badge-variant="ink"],
[data-comixa-theme][data-comixa-badge-variant="ink"],
[data-comixa-theme] [data-comixa-sticker-variant="ink"],
[data-comixa-theme][data-comixa-sticker-variant="ink"],
[data-comixa-theme] [data-comixa-sound-badge-variant="boom"],
[data-comixa-theme][data-comixa-sound-badge-variant="boom"] { color: #fff !important; }

[data-comixa-theme="pop-art"] [data-comixa-badge],
[data-comixa-theme="pop-art"][data-comixa-badge],
[data-comixa-theme="pop-art"] [data-comixa-sticker],
[data-comixa-theme="pop-art"][data-comixa-sticker],
[data-comixa-theme="pop-art"] [data-comixa-sound-badge],
[data-comixa-theme="pop-art"][data-comixa-sound-badge] {
  letter-spacing: 0.055em;
  text-transform: none;
}
[data-comixa-theme="pop-art"] [data-comixa-ribbon],
[data-comixa-theme="pop-art"][data-comixa-ribbon] {
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

[data-comixa-theme="manga"] [data-comixa-ribbon-variant="corner"],
[data-comixa-theme="manga"][data-comixa-ribbon-variant="corner"] {
  color: #fff !important;
}
[data-comixa-theme="manga"] [data-comixa-button-variant="success"]::after,
[data-comixa-theme="manga"][data-comixa-button-variant="success"]::after {
  content: "✨";
  position: relative;
  z-index: 10;
  display: inline-flex;
  margin-left: 0.05rem;
  font-size: 0.92em;
  line-height: 1;
}
[data-comixa-theme="manga"] [data-comixa-button-variant="danger"]::after,
[data-comixa-theme="manga"][data-comixa-button-variant="danger"]::after {
  content: "💢";
  position: relative;
  z-index: 10;
  display: inline-flex;
  margin-left: 0.05rem;
  font-size: 0.95em;
  line-height: 1;
}
[data-comixa-theme="manga"] [data-comixa-button-variant="warning"]::after,
[data-comixa-theme="manga"][data-comixa-button-variant="warning"]::after {
  content: "!!!";
  position: relative;
  z-index: 10;
  display: inline-flex;
  margin-left: 0.05rem;
  font-family: "Antonio", Impact, sans-serif;
  font-size: 0.9em;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.02em;
  transform: rotate(-4deg);
}
[data-comixa-theme="manga"] [data-comixa-input],
[data-comixa-theme="manga"][data-comixa-input],
[data-comixa-theme="manga"] [data-comixa-textarea],
[data-comixa-theme="manga"][data-comixa-textarea] {
  border-width: 4px;
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25rem 1.25rem;
}
`;

const ComixaThemeContext = React.createContext<ComixaThemeName>("default");

export function useComixaTheme() {
  return React.useContext(ComixaThemeContext);
}

function ensureThemeStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(THEME_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = THEME_STYLE_ID;
  style.textContent = THEME_RUNTIME_CSS;
  document.head.appendChild(style);
}

export interface ComixaProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: ComixaThemeName;
}

export const ComixaProvider = React.forwardRef<HTMLDivElement, ComixaProviderProps>(
  ({ theme = "default", className, style, children, ...props }, ref) => {
    React.useLayoutEffect(() => {
      ensureThemeStyles();
    }, []);

    return (
      <ComixaThemeContext.Provider value={theme}>
        <div
          ref={ref}
          data-comixa-theme={theme}
          className={cn("contents", className)}
          style={{ ...getComixaThemeStyle(theme), ...style }}
          {...props}
        >
          {children}
        </div>
      </ComixaThemeContext.Provider>
    );
  }
);
ComixaProvider.displayName = "ComixaProvider";

export function ThemeScope({
  theme,
  className,
  style,
  children,
  ...props
}: ComixaProviderProps) {
  return (
    <ComixaProvider theme={theme} className={className} style={style} {...props}>
      {children}
    </ComixaProvider>
  );
}
