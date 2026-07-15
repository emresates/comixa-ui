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
  0%, 100% { transform: translateX(-6px); box-shadow: 2px 2px 0 #1A1A1A; }
  50% { transform: translateX(6px); box-shadow: 6px 6px 0 #1A1A1A; }
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
  "inline-flex items-center justify-center font-comic uppercase tracking-wide text-ink",
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
        yellow: "",
        blue: "",
        red: "",
        green: "",
        pink: "",
      },
    },
    defaultVariants: {
      variant: "dots",
      size: "md",
      tone: "yellow",
    },
  }
);

const toneClass = {
  yellow: "bg-comic-yellow",
  blue: "bg-comic-blue",
  red: "bg-comic-red",
  green: "bg-comic-green",
  pink: "bg-comic-pink",
} as const;

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

    const color = toneClass[tone ?? "yellow"];

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
                className={cn("h-3 w-3 rounded-full border-2 border-ink", color)}
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
              "grid h-16 w-16 place-items-center border-2 border-ink shadow-comic",
              color
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
              className={cn("h-10 w-14 border-2 border-ink", color)}
            />
            <span>{label}</span>
          </>
        ) : null}
        {variant === "speech" ? (
          <span
            data-comixa-loader-speech=""
            className={cn(
              "relative rounded-[1.25rem] border-2 border-ink px-4 py-2 shadow-comic-sm after:absolute after:-bottom-2 after:left-5 after:h-4 after:w-4 after:rotate-45 after:border-b-2 after:border-r-2 after:border-ink",
              color,
              tone === "yellow" ? "after:bg-comic-yellow" : "",
              tone === "blue" ? "after:bg-comic-blue" : "",
              tone === "red" ? "after:bg-comic-red" : "",
              tone === "green" ? "after:bg-comic-green" : "",
              tone === "pink" ? "after:bg-comic-pink" : ""
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
