import * as React from "react";
import { cn } from "../lib/cn";

export type ComicCursorVariant =
  | "auto"
  | "classic"
  | "dot"
  | "ring"
  | "spark"
  | "comic"
  | "retro"
  | "pop-art"
  | "manga"
  | "vintage";

export interface ComicCursorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: ComicCursorVariant;
  enabled?: boolean;
  animated?: boolean;
  showLabel?: boolean;
  hideNativeCursor?: boolean;
  behindOnHover?: boolean;
  label?: React.ReactNode;
  size?: number;
  trailCount?: number;
}

type ResolvedCursorVariant = Exclude<ComicCursorVariant, "auto">;

const themeVariantMap: Record<string, ResolvedCursorVariant> = {
  light: "comic",
  retro: "retro",
  "pop-art": "pop-art",
  manga: "manga",
  vintage: "vintage",
};

const variantClasses: Record<ResolvedCursorVariant, string> = {
  classic:
    "rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [background:var(--comixa-warning-bg,#FFD84D)] [box-shadow:4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E)]",
  dot:
    "rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-warning-border,#1E1E1E)] [background:var(--comixa-warning-bg,#FFD84D)] [box-shadow:var(--comixa-warning-shadow-value,2px_2px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
  ring:
    "rounded-full border-[3px] [border-color:var(--comixa-primary-border,#4F9CF9)] bg-transparent [box-shadow:0_0_0_2px_var(--comixa-outline-border,#1E1E1E),0_0_18px_var(--comixa-primary-bg,#4F9CF9)]",
  spark:
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-danger-border,#1E1E1E)] [background:var(--comixa-danger-bg,#FF4FA3)] [box-shadow:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [clip-path:polygon(50%_0,62%_32%,96%_18%,72%_50%,100%_66%,64%_68%,72%_100%,50%_76%,28%_100%,36%_68%,0_66%,28%_50%,4%_18%,38%_32%)]",
  comic:
    "rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-warning-border,#1E1E1E)] [background:var(--comixa-warning-bg,#FFD84D)] [box-shadow:4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E)]",
  retro:
    "rotate-[-7deg] rounded-[0.85rem] [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#3B2B22)] [background:var(--comixa-warning-bg,#D9A441)] [background-image:radial-gradient(circle_at_2px_2px,rgba(59,43,34,0.32)_1px,transparent_0)] [background-size:8px_8px] [box-shadow:6px_6px_0_0_var(--comixa-outline-shadow,#7a4d24)]",
  "pop-art":
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-danger-border,#111111)] [background:var(--comixa-danger-bg,#FF4B4B)] [background-image:radial-gradient(circle_at_2px_2px,var(--comixa-warning-bg,#FFE14D)_1.5px,transparent_0)] [background-size:8px_8px] [box-shadow:8px_8px_0_0_var(--comixa-warning-bg,#FFD400)] [clip-path:polygon(50%_0,61%_30%,95%_18%,72%_49%,100%_62%,65%_66%,72%_100%,50%_74%,28%_100%,35%_66%,0_62%,28%_49%,5%_18%,39%_30%)]",
  manga:
    "rounded-none border-[3px] [border-color:var(--comixa-outline-border,#111111)] [background:var(--comixa-outline-bg,#FFFFFF)] [background-image:repeating-linear-gradient(-35deg,transparent_0,transparent_5px,rgba(0,0,0,0.24)_5px,rgba(0,0,0,0.24)_6px)] shadow-none",
  vintage:
    "rounded-[0.35rem] [border-width:var(--comixa-button-border-width,1px)] [border-color:var(--comixa-outline-border,#4A3A2A)] [background:var(--comixa-outline-bg,#F7EED8)] [background-image:radial-gradient(circle_at_1px_1px,rgba(74,58,42,0.24)_0.8px,transparent_0),repeating-linear-gradient(0deg,rgba(74,58,42,0.08)_0,rgba(74,58,42,0.08)_1px,transparent_1px,transparent_5px)] [background-size:8px_8px,100%_6px] [box-shadow:2px_2px_0_0_var(--comixa-outline-shadow,#4A3A2A)] [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]",
};

const trailClasses: Record<ResolvedCursorVariant, string> = {
  classic:
    "rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-danger-border,#1E1E1E)] [background:var(--comixa-danger-bg,#FF4FA3)]",
  dot:
    "rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-danger-border,#1E1E1E)] [background:var(--comixa-danger-bg,#FF4FA3)]",
  ring:
    "rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-primary-border,#4F9CF9)] bg-transparent",
  spark:
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-warning-border,#1E1E1E)] [background:var(--comixa-warning-bg,#FFD84D)] [clip-path:polygon(50%_0,62%_32%,96%_18%,72%_50%,100%_66%,64%_68%,72%_100%,50%_76%,28%_100%,36%_68%,0_66%,28%_50%,4%_18%,38%_32%)]",
  comic:
    "rounded-full [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-danger-border,#1E1E1E)] [background:var(--comixa-danger-bg,#FF4FA3)]",
  retro:
    "rounded-[42%_58%_48%_52%] [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#3B2B22)] [background:var(--comixa-warning-bg,#D9A441)]",
  "pop-art":
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-warning-border,#111111)] [background:var(--comixa-warning-bg,#FFE14D)] [clip-path:polygon(50%_0,61%_30%,95%_18%,72%_49%,100%_62%,65%_66%,72%_100%,50%_74%,28%_100%,35%_66%,0_62%,28%_49%,5%_18%,39%_30%)]",
  manga:
    "rounded-none border-0 [background:repeating-linear-gradient(90deg,var(--comixa-outline-border,#111111)_0,var(--comixa-outline-border,#111111)_10px,transparent_10px,transparent_16px)]",
  vintage:
    "rounded-[0.35rem] [border-width:var(--comixa-button-border-width,1px)] [border-color:var(--comixa-outline-border,#4A3A2A)] [background:var(--comixa-default-bg,#E5C37A)] [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]",
};

const labelClasses: Record<ResolvedCursorVariant, string> = {
  classic:
    "rounded-md border-2 border-ink bg-paper px-2 py-1 text-ink shadow-[4px_4px_0_0_#1E1E1E]",
  dot: "rounded-md border-2 border-ink bg-paper px-2 py-1 text-ink shadow-[4px_4px_0_0_#1E1E1E]",
  ring: "rounded-full border-2 border-ink bg-paper px-3 py-1 text-ink shadow-[4px_4px_0_0_#1E1E1E]",
  spark:
    "rounded-md border-2 border-ink bg-comic-yellow px-2 py-1 text-ink shadow-[4px_4px_0_0_#1E1E1E]",
  comic:
    "rounded-md border-2 border-ink bg-comic-yellow px-2 py-1 text-ink shadow-[4px_4px_0_0_#1E1E1E]",
  retro:
    "rotate-[-3deg] rounded-lg border-2 px-3 py-1 [border-color:var(--comixa-outline-border,#3B2B22)] [background:var(--comixa-warning-bg,#D9A441)] [color:var(--comixa-warning-text,#3B2B22)] [box-shadow:6px_6px_0_0_var(--comixa-outline-shadow,#7a4d24)]",
  "pop-art":
    "rounded-md border-2 px-3 py-1 [border-color:var(--comixa-outline-border,#111111)] [background:var(--comixa-warning-bg,#FFE14D)] [color:var(--comixa-warning-text,#111111)] [box-shadow:8px_8px_0_0_var(--comixa-danger-bg,#FF4B4B)] mix-blend-multiply",
  manga:
    "rounded-none border-[3px] px-3 py-1 [border-color:var(--comixa-outline-border,#111111)] [background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] shadow-none",
  vintage:
    "rounded-[0.35rem] border px-3 py-1 [border-color:var(--comixa-outline-border,#4A3A2A)] [background:var(--comixa-outline-bg,#F7EED8)] [color:var(--comixa-outline-text,#7B2D26)] [box-shadow:2px_2px_0_0_var(--comixa-outline-shadow,#4A3A2A)]",
};

const defaultLabels: Record<ResolvedCursorVariant, string[]> = {
  classic: ["CLICK"],
  dot: ["CLICK"],
  ring: ["CLICK"],
  spark: ["BAM!"],
  comic: ["CLICK"],
  retro: ["CLICK!"],
  "pop-art": ["POW!", "BAM!", "WOW!"],
  manga: ["!!!"],
  vintage: ["STAMP", "READ"],
};

const cursorIcons: Partial<Record<ResolvedCursorVariant, string>> = {
  classic: "●",
  comic: "●",
  retro: "◎",
  "pop-art": "💥",
  manga: "✦",
  vintage: "⬢",
};

const iconClasses: Partial<Record<ResolvedCursorVariant, string>> = {
  classic: "[color:var(--comixa-warning-bg,#FFD84D)]",
  comic: "[color:var(--comixa-warning-bg,#FFD84D)]",
  retro:
    "[color:var(--comixa-warning-bg,#D9A441)] [-webkit-text-stroke:1px_var(--comixa-outline-border,#3B2B22)]",
  "pop-art": "mix-blend-multiply",
  manga: "[color:var(--comixa-outline-border,#111111)]",
  vintage:
    "[color:var(--comixa-outline-bg,#F7EED8)] [-webkit-text-stroke:1px_var(--comixa-outline-border,#4A3A2A)]",
};

const easingByVariant: Record<ResolvedCursorVariant, number> = {
  classic: 0.34,
  dot: 0.34,
  ring: 0.3,
  spark: 0.38,
  comic: 0.34,
  retro: 0.22,
  "pop-art": 0.42,
  manga: 0.62,
  vintage: 0.18,
};

function getThemeVariant(): ResolvedCursorVariant {
  if (typeof document === "undefined") return "comic";
  const theme = document.documentElement.getAttribute("data-comixa-theme");
  return themeVariantMap[theme ?? ""] ?? "comic";
}

function pickLabel(variant: ResolvedCursorVariant) {
  const labels = defaultLabels[variant];
  return labels[Math.floor(Math.random() * labels.length)] ?? "CLICK";
}

function cursorShadow(variant: ResolvedCursorVariant) {
  if (variant === "retro") {
    return "3px 3px 3px var(--comixa-outline-shadow,#7a4d24)";
  }
  if (variant === "pop-art") {
    return "4px 4px 4px var(--comixa-warning-bg,#FFD400)";
  }
  if (variant === "manga") return "1px 1px 0 var(--comixa-outline-shadow,#111111)";
  if (variant === "vintage") {
    return "2px 2px 0 var(--comixa-outline-shadow,#4A3A2A)";
  }
  return "4px 4px 0 var(--comixa-outline-shadow,#1E1E1E)";
}

function cursorIconSize(variant: ResolvedCursorVariant, size: number) {
  const ratio =
    variant === "pop-art"
      ? 0.78
      : variant === "manga"
        ? 0.76
        : variant === "vintage"
          ? 0.7
          : variant === "classic" || variant === "comic"
            ? 0.82
            : 0.66;
  return Math.max(13, Math.round(size * ratio));
}

export const ComicCursor = React.forwardRef<HTMLDivElement, ComicCursorProps>(
  (
    {
      className,
      variant = "auto",
      enabled = true,
      animated = true,
      showLabel = true,
      hideNativeCursor = true,
      behindOnHover = false,
      label,
      size = 28,
      trailCount = 5,
      style,
      ...props
    },
    ref
  ) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const labelRef = React.useRef<HTMLSpanElement | null>(null);
    const trailRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
    const activeRef = React.useRef(false);
    const [active, setActive] = React.useState(false);
    const [autoVariant, setAutoVariant] =
      React.useState<ResolvedCursorVariant>(() => getThemeVariant());
    const [activeLabel, setActiveLabel] = React.useState<React.ReactNode>(() =>
      pickLabel(autoVariant)
    );
    const resolvedVariant: ResolvedCursorVariant =
      variant === "auto" ? autoVariant : variant;
    const cursorIcon = cursorIcons[resolvedVariant];
    const iconSize = cursorIconSize(resolvedVariant, size);
    const trailWidth = resolvedVariant === "manga" ? size * 2 : size;
    const trailHeight =
      resolvedVariant === "manga" ? Math.max(3, size * 0.14) : size;
    const position = React.useRef({
      x: -100,
      y: -100,
      tx: -100,
      ty: -100,
      trail: Array.from({ length: trailCount }, () => ({ x: -100, y: -100 })),
    });

    React.useEffect(() => {
      position.current.trail = Array.from({ length: trailCount }, () => ({
        x: position.current.x,
        y: position.current.y,
      }));
      trailRefs.current = trailRefs.current.slice(0, trailCount);
    }, [trailCount]);

    React.useEffect(() => {
      if (variant !== "auto" || typeof document === "undefined") return;

      const update = () => setAutoVariant(getThemeVariant());
      update();
      const observer = new MutationObserver(update);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-comixa-theme"],
      });
      return () => observer.disconnect();
    }, [variant]);

    React.useEffect(() => {
      if (!enabled || typeof window === "undefined") return;
      let frame = 0;
      const onMove = (event: PointerEvent) => {
        position.current.tx = event.clientX;
        position.current.ty = event.clientY;

        const target =
          typeof document !== "undefined"
            ? document.elementFromPoint(event.clientX, event.clientY)
            : event.target;
        const nextActive =
          target instanceof Element
            ? Boolean(target.closest("[data-comixa-cursor-zone]"))
            : false;
        if (activeRef.current !== nextActive) {
          activeRef.current = nextActive;
          setActive(nextActive);
          if (nextActive && label === undefined) {
            setActiveLabel(pickLabel(resolvedVariant));
          }
        }
      };
      const tick = () => {
        const state = position.current;
        const ease = animated ? easingByVariant[resolvedVariant] : 1;
        state.x += (state.tx - state.x) * ease;
        state.y += (state.ty - state.y) * ease;

        let followX = state.x;
        let followY = state.y;
        state.trail.forEach((point, index) => {
          point.x += (followX - point.x) * (0.26 - Math.min(index, 4) * 0.025);
          point.y += (followY - point.y) * (0.26 - Math.min(index, 4) * 0.025);
          followX = point.x;
          followY = point.y;
          const node = trailRefs.current[index];
          if (node) {
            node.style.transform = `translate3d(${point.x - trailWidth / 2}px, ${point.y - trailHeight / 2}px, 0)`;
          }
        });

        if (localRef.current) {
          localRef.current.style.transform = `translate3d(${state.x - size / 2}px, ${state.y - size / 2}px, 0)`;
        }
        if (labelRef.current) {
          labelRef.current.style.transform = `translate3d(${state.x + size * 0.45}px, ${state.y - size * 1.15}px, 0)`;
        }
        frame = window.requestAnimationFrame(tick);
      };
      window.addEventListener("pointermove", onMove);
      frame = window.requestAnimationFrame(tick);
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.cancelAnimationFrame(frame);
      };
    }, [animated, enabled, label, resolvedVariant, size, trailHeight, trailWidth]);

    React.useEffect(() => {
      if (!enabled || !hideNativeCursor || typeof document === "undefined") {
        return;
      }
      const previous = document.body.style.cursor;
      document.body.style.cursor = "none";
      return () => {
        document.body.style.cursor = previous;
      };
    }, [enabled, hideNativeCursor]);

    if (!enabled) return null;

    return (
      <>
        {Array.from({ length: trailCount }).map((_, index) => (
          <span
            key={index}
            ref={(node) => {
              trailRefs.current[index] = node;
            }}
            aria-hidden="true"
            className={cn(
              "pointer-events-none fixed left-0 top-0 z-[9998] hidden place-items-center transition-opacity duration-150 md:grid",
              cursorIcon
                ? "border-0 bg-transparent font-comic leading-none"
                : trailClasses[resolvedVariant],
              cursorIcon && iconClasses[resolvedVariant]
            )}
            style={{
              width: trailWidth,
              height: trailHeight,
              fontSize: iconSize,
              textShadow: cursorIcon ? cursorShadow(resolvedVariant) : undefined,
              opacity: Math.max(0.06, (active ? 0.18 : 0.28) - index * 0.04),
              ...style,
            }}
          >
            {cursorIcon}
          </span>
        ))}
        {showLabel ? (
          <span
            ref={labelRef}
            aria-hidden="true"
            className={cn(
              "pointer-events-none fixed left-0 top-0 z-[9999] hidden origin-bottom-left whitespace-nowrap font-comic text-xs uppercase leading-none md:block",
              active ? "opacity-100" : "opacity-0",
              labelClasses[resolvedVariant]
            )}
          >
            {label ?? activeLabel}
          </span>
        ) : null}
        <div
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed left-0 top-0 hidden will-change-transform md:block",
            className
          )}
          style={{
            width: size,
            height: size,
            zIndex: active && behindOnHover ? 1 : 9999,
            ...style,
          }}
          {...props}
        >
          <span
            className={cn(
              "grid h-full w-full origin-center place-items-center transition-[transform,opacity,filter] duration-300 ease-out",
              active ? "opacity-80" : "opacity-100",
              resolvedVariant === "pop-art" && "mix-blend-multiply",
              resolvedVariant === "retro" && active && "scale-110",
              (resolvedVariant === "classic" || resolvedVariant === "comic") &&
                (active ? "scale-[0.88] -translate-y-1" : "scale-[0.72]"),
              cursorIcon
                ? "border-0 bg-transparent font-comic leading-none"
                : variantClasses[resolvedVariant],
              cursorIcon && iconClasses[resolvedVariant]
            )}
            style={{
              fontSize: iconSize,
              textShadow: cursorIcon ? cursorShadow(resolvedVariant) : undefined,
            }}
          >
            {cursorIcon}
          </span>
        </div>
      </>
    );
  }
);
ComicCursor.displayName = "ComicCursor";

export type CursorFollowProps = ComicCursorProps;

export const CursorFollow = ComicCursor;
CursorFollow.displayName = "CursorFollow";
