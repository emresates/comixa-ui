import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const STYLE_ID = "comixa-reveal-keyframes";
const CSS = `
@keyframes comixa-reveal-pop {
  0% { opacity: 0; transform: scale(0.82) rotate(-2deg); }
  62% { opacity: 1; transform: scale(1.04) rotate(1deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
@keyframes comixa-reveal-slide-up {
  0% { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes comixa-reveal-panel-wipe {
  0% { opacity: 0; clip-path: inset(0 100% 0 0); }
  20% { opacity: 1; }
  100% { opacity: 1; clip-path: inset(0 0 0 0); }
}
@keyframes comixa-reveal-spotlight {
  0% { opacity: 0; clip-path: circle(0% at 50% 50%); filter: saturate(1.6); }
  100% { opacity: 1; clip-path: circle(80% at 50% 50%); filter: saturate(1); }
}
[data-comixa-reveal] {
  animation-name: var(--comixa-reveal-name);
  animation-duration: var(--comixa-reveal-duration, 520ms);
  animation-delay: var(--comixa-reveal-delay, 0ms);
  animation-timing-function: cubic-bezier(0.34, 1.45, 0.64, 1);
  animation-fill-mode: both;
}
`;

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

export const comicRevealVariants = cva("will-change-transform", {
  variants: {
    variant: {
      pop: "",
      "slide-up": "",
      "panel-wipe": "",
      spotlight: "",
    },
  },
  defaultVariants: {
    variant: "pop",
  },
});

const animationNames = {
  pop: "comixa-reveal-pop",
  "slide-up": "comixa-reveal-slide-up",
  "panel-wipe": "comixa-reveal-panel-wipe",
  spotlight: "comixa-reveal-spotlight",
} as const;

export interface ComicRevealProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comicRevealVariants> {
  revealKey?: React.Key;
  delay?: number;
  duration?: number;
}

export const ComicReveal = React.forwardRef<HTMLDivElement, ComicRevealProps>(
  (
    {
      className,
      variant = "pop",
      revealKey,
      delay = 0,
      duration = 520,
      style,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      ensureStyles();
    }, []);

    return (
      <div
        key={revealKey}
        ref={ref}
        data-comixa-reveal=""
        className={cn(comicRevealVariants({ variant }), className)}
        style={
          {
            ["--comixa-reveal-name" as string]:
              animationNames[variant ?? "pop"],
            ["--comixa-reveal-delay" as string]: `${delay}ms`,
            ["--comixa-reveal-duration" as string]: `${duration}ms`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);
ComicReveal.displayName = "ComicReveal";
