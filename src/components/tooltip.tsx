import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const TOOLTIP_STYLE_ID = "comixa-tooltip-keyframes";
const TOOLTIP_CSS = `
@keyframes comixa-tooltip-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
[data-comixa-tooltip][data-state="open"] {
  animation: comixa-tooltip-in 0.12s ease-out both;
}
`;

function ensureTooltipStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(TOOLTIP_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = TOOLTIP_STYLE_ID;
  style.textContent = TOOLTIP_CSS;
  document.head.appendChild(style);
}

export const tooltipVariants = cva(
  [
    "pointer-events-none z-[110] max-w-xs border-2 border-ink px-2.5 py-1.5",
    "font-body text-sm shadow-comic-sm whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-ink text-paper rounded-lg",
        pop: "bg-comic-yellow text-ink rounded-lg",
        paper: "bg-paper text-ink rounded-lg",
        danger: "bg-comic-red text-white rounded-lg",
        success: "bg-comic-green text-ink rounded-lg",
        blue: "bg-comic-blue text-white rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type TooltipSide = "top" | "right" | "bottom" | "left";

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  disabled?: boolean;
  contentClassName?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Tooltip({
  content,
  children,
  side = "top",
  variant = "default",
  delay = 120,
  disabled = false,
  className,
  contentClassName,
  ...props
}: TooltipProps) {
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const tipRef = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const [placed, setPlaced] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  React.useLayoutEffect(() => {
    ensureTooltipStyles();
  }, []);

  const updatePosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    const tip = tipRef.current;
    if (!trigger || !tip) return;

    const t = trigger.getBoundingClientRect();
    const p = tip.getBoundingClientRect();
    const gap = 8;
    const pad = 8;

    let top = 0;
    let left = 0;

    switch (side) {
      case "bottom":
        top = t.bottom + gap;
        left = t.left + t.width / 2 - p.width / 2;
        break;
      case "left":
        top = t.top + t.height / 2 - p.height / 2;
        left = t.left - gap - p.width;
        break;
      case "right":
        top = t.top + t.height / 2 - p.height / 2;
        left = t.right + gap;
        break;
      case "top":
      default:
        top = t.top - gap - p.height;
        left = t.left + t.width / 2 - p.width / 2;
        break;
    }

    left = clamp(left, pad, window.innerWidth - p.width - pad);
    top = clamp(top, pad, window.innerHeight - p.height - pad);

    setCoords({ top, left });
    setPlaced(true);
  }, [side]);

  const show = () => {
    if (disabled) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setPlaced(false);
      setOpen(true);
    }, delay);
  };

  const hide = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setOpen(false);
    setPlaced(false);
  };

  React.useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const frame = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(frame);
  }, [open, updatePosition, content, side]);

  React.useEffect(() => {
    if (!open) return;
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, updatePosition]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span
      ref={triggerRef}
      className={cn("inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      {children}
      {open && typeof document !== "undefined"
        ? createPortal(
            <span
              ref={tipRef}
              role="tooltip"
              data-comixa-tooltip=""
              data-state="open"
              data-side={side}
              className={cn(tooltipVariants({ variant }), contentClassName)}
              style={{
                position: "fixed",
                top: coords.top,
                left: coords.left,
                visibility: placed ? "visible" : "hidden",
              }}
            >
              {content}
            </span>,
            document.body
          )
        : null}
    </span>
  );
}
