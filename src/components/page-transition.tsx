import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const STYLE_ID = "comixa-page-transition-keyframes";
const CSS = `
@keyframes comixa-page-panel-swipe {
  0% { clip-path: inset(0 100% 0 0); transform: translateX(-18px); opacity: 0; }
  60% { clip-path: inset(0 0 0 0); opacity: 1; }
  100% { clip-path: inset(0 0 0 0); transform: translateX(0); opacity: 1; }
}
@keyframes comixa-page-burst {
  0% { transform: scale(0.88) rotate(-2deg); filter: saturate(1.4); opacity: 0; }
  55% { transform: scale(1.04) rotate(1deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); filter: saturate(1); opacity: 1; }
}
@keyframes comixa-page-flip {
  0% { transform: perspective(900px) rotateY(-18deg) translateY(12px); transform-origin: left center; opacity: 0; }
  100% { transform: perspective(900px) rotateY(0deg) translateY(0); opacity: 1; }
}
@keyframes comixa-page-speed-lines {
  0% { transform: translateX(34px) skewX(-6deg); opacity: 0; }
  72% { transform: translateX(-4px) skewX(2deg); opacity: 1; }
  100% { transform: translateX(0) skewX(0deg); opacity: 1; }
}
@keyframes comixa-page-lines {
  0% { transform: translateX(-100%); opacity: 0; }
  35% { opacity: 0.55; }
  100% { transform: translateX(120%); opacity: 0; }
}
[data-comixa-page-transition="panel-swipe"] { animation-name: comixa-page-panel-swipe; }
[data-comixa-page-transition="burst"] { animation-name: comixa-page-burst; }
[data-comixa-page-transition="flip"] { animation-name: comixa-page-flip; }
[data-comixa-page-transition="speed-lines"] { animation-name: comixa-page-speed-lines; }
[data-comixa-page-speed-lines]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(100deg, transparent 0 12px, rgba(26,26,26,0.18) 12px 15px, transparent 15px 28px);
  animation: comixa-page-lines var(--comixa-page-transition-duration, 420ms) ease-out both;
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

export const pageTransitionVariants = cva(
  "relative overflow-hidden border-2 border-ink bg-paper text-ink shadow-comic will-change-transform",
  {
    variants: {
      variant: {
        "panel-swipe": "rounded-lg",
        burst: "rounded-xl",
        flip: "rounded-lg",
        "speed-lines": "rounded-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-7",
      },
    },
    defaultVariants: {
      variant: "panel-swipe",
      padding: "md",
    },
  }
);

export interface PageTransitionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageTransitionVariants> {
  transitionKey?: React.Key;
  duration?: number;
  easing?: string;
}

export const PageTransition = React.forwardRef<
  HTMLDivElement,
  PageTransitionProps
>(
  (
    {
      className,
      variant = "panel-swipe",
      padding,
      transitionKey,
      duration,
      easing = "cubic-bezier(0.34, 1.45, 0.64, 1)",
      style,
      children,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      ensureStyles();
    }, []);

    const resolvedDuration = duration ?? 420;

    return (
      <div
        key={transitionKey}
        ref={ref}
        data-comixa-page-transition={variant}
        data-comixa-page-speed-lines={
          variant === "speed-lines" ? "" : undefined
        }
        className={cn(pageTransitionVariants({ variant, padding }), className)}
        style={
          {
            animationDuration: `${resolvedDuration}ms`,
            animationTimingFunction: easing,
            animationFillMode: "both",
            ["--comixa-page-transition-duration" as string]:
              `${resolvedDuration}ms`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);
PageTransition.displayName = "PageTransition";
