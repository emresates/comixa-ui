import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const STYLE_ID = "comixa-loader-keyframes";
const CSS = `
@keyframes comixa-loader-pop {
  0%, 100% { transform: translateY(0) scale(1); }
  45% { transform: translateY(-8px) scale(1.12); }
}
@keyframes comixa-loader-burst {
  0% { transform: scale(0.7) rotate(-8deg); opacity: 0.65; }
  50% { transform: scale(1.08) rotate(4deg); opacity: 1; }
  100% { transform: scale(0.7) rotate(-8deg); opacity: 0.65; }
}
@keyframes comixa-loader-panel {
  0%, 100% { transform: translateX(-6px); box-shadow: var(--comixa-loader-shadow-sm); }
  50% { transform: translateX(6px); box-shadow: var(--comixa-loader-shadow-lg); }
}
@keyframes comixa-loader-speech {
  0%, 100% { transform: scale(0.96); opacity: 0.75; }
  50% { transform: scale(1.05); opacity: 1; }
}
[data-comixa-loader-dot] { animation: comixa-loader-pop 0.72s ease-in-out infinite; animation-delay: var(--delay); }
[data-comixa-loader-burst] { animation: comixa-loader-burst 0.85s ease-in-out infinite; }
[data-comixa-loader-panel] { animation: comixa-loader-panel 0.85s ease-in-out infinite; }
[data-comixa-loader-speech] { animation: comixa-loader-speech 0.9s ease-in-out infinite; }
`;

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

export const comicLoaderVariants = cva(
  [
    "inline-flex items-center justify-center font-comic uppercase tracking-wide",
    "[color:var(--comixa-loader-text)]",
  ].join(" "),
  {
    variants: {
      variant: {
        dots: "gap-1.5",
        burst: "relative",
        panel: "gap-3",
        speech: "relative",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl",
      },
      tone: {
        yellow:
          "[--comixa-loader-bg:var(--comixa-warning-bg,#FFD84D)] [--comixa-loader-text:var(--comixa-warning-text,#111111)] [--comixa-loader-border:var(--comixa-warning-border,#1E1E1E)] [--comixa-loader-shadow:var(--comixa-warning-shadow-value,4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
        blue:
          "[--comixa-loader-bg:var(--comixa-primary-bg,#4F9CF9)] [--comixa-loader-text:var(--comixa-primary-text,#FFFFFF)] [--comixa-loader-border:var(--comixa-primary-border,#1E1E1E)] [--comixa-loader-shadow:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))]",
        red:
          "[--comixa-loader-bg:var(--comixa-danger-bg,#FF5757)] [--comixa-loader-text:var(--comixa-danger-text,#FFFFFF)] [--comixa-loader-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-loader-shadow:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
        green:
          "[--comixa-loader-bg:var(--comixa-success-bg,#4ADE80)] [--comixa-loader-text:var(--comixa-success-text,#111111)] [--comixa-loader-border:var(--comixa-success-border,#1E1E1E)] [--comixa-loader-shadow:var(--comixa-success-shadow-value,4px_4px_0_0_var(--comixa-success-shadow,#1E1E1E))]",
        pink:
          "[--comixa-loader-bg:var(--comixa-danger-bg,#FF4FA3)] [--comixa-loader-text:var(--comixa-danger-text,#FFFFFF)] [--comixa-loader-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-loader-shadow:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
      },
    },
    defaultVariants: {
      variant: "dots",
      size: "md",
      tone: "yellow",
    },
  }
);

export interface ComicLoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comicLoaderVariants> {
  label?: string;
}

export const ComicLoader = React.forwardRef<HTMLDivElement, ComicLoaderProps>(
  (
    {
      className,
      variant = "dots",
      size,
      tone = "yellow",
      label = "Loading",
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      ensureStyles();
    }, []);

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(comicLoaderVariants({ variant, size, tone }), className)}
        {...props}
      >
        {variant === "dots" ? (
          <>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                data-comixa-loader-dot=""
                className="h-3 w-3 rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-loader-border)] [background:var(--comixa-loader-bg)] [box-shadow:var(--comixa-loader-shadow)]"
                style={{ ["--delay" as string]: `${i * 120}ms` }}
              />
            ))}
            <span className="sr-only">{label}</span>
          </>
        ) : null}
        {variant === "burst" ? (
          <span
            data-comixa-loader-burst=""
            className={cn(
              "grid h-16 w-16 place-items-center [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-loader-border)] [background:var(--comixa-loader-bg)] [box-shadow:var(--comixa-loader-shadow)]"
            )}
            style={{
              clipPath:
                "polygon(50% 0%, 61% 30%, 95% 18%, 72% 49%, 100% 62%, 65% 66%, 72% 100%, 50% 74%, 28% 100%, 35% 66%, 0 62%, 28% 49%, 5% 18%, 39% 30%)",
            }}
          >
            {label}
          </span>
        ) : null}
        {variant === "panel" ? (
          <>
            <span
              data-comixa-loader-panel=""
              className="h-10 w-14 [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-loader-border)] [background:var(--comixa-loader-bg)]"
              style={
                {
                  "--comixa-loader-shadow-sm":
                    "2px 2px 0 var(--comixa-loader-border)",
                  "--comixa-loader-shadow-lg":
                    "6px 6px 0 var(--comixa-loader-border)",
                } as React.CSSProperties
              }
            />
            <span>{label}</span>
          </>
        ) : null}
        {variant === "speech" ? (
          <span
            data-comixa-loader-speech=""
            className={cn(
              "relative px-4 py-2 [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-loader-border)] [border-radius:calc(var(--comixa-button-radius,0.5rem)_*_2.5)] [background:var(--comixa-loader-bg)] [box-shadow:var(--comixa-loader-shadow)] after:absolute after:-bottom-2 after:left-5 after:h-4 after:w-4 after:rotate-45 after:border-b-2 after:border-r-2 after:[border-color:var(--comixa-loader-border)] after:[background:var(--comixa-loader-bg)]"
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    );
  }
);
ComicLoader.displayName = "ComicLoader";
