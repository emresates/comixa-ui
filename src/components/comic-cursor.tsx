import * as React from "react";
import { cn } from "../lib/cn";

export type ComicCursorVariant = "dot" | "ring" | "spark";

export interface ComicCursorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: ComicCursorVariant;
  enabled?: boolean;
  hideNativeCursor?: boolean;
  size?: number;
  trailCount?: number;
}

const variantClasses: Record<ComicCursorVariant, string> = {
  dot: "rounded-full border-2 border-ink bg-comic-yellow shadow-comic-sm",
  ring: "rounded-full border-[3px] border-comic-blue bg-transparent shadow-[0_0_0_2px_#1A1A1A]",
  spark:
    "border-2 border-ink bg-comic-pink shadow-comic-sm [clip-path:polygon(50%_0,62%_32%,96%_18%,72%_50%,100%_66%,64%_68%,72%_100%,50%_76%,28%_100%,36%_68%,0_66%,28%_50%,4%_18%,38%_32%)]",
};

const trailClasses: Record<ComicCursorVariant, string> = {
  dot: "rounded-full border-2 border-ink bg-comic-pink",
  ring: "rounded-full border-2 border-comic-blue bg-transparent",
  spark:
    "border-2 border-ink bg-comic-yellow [clip-path:polygon(50%_0,62%_32%,96%_18%,72%_50%,100%_66%,64%_68%,72%_100%,50%_76%,28%_100%,36%_68%,0_66%,28%_50%,4%_18%,38%_32%)]",
};

export const ComicCursor = React.forwardRef<HTMLDivElement, ComicCursorProps>(
  (
    {
      className,
      variant = "dot",
      enabled = true,
      hideNativeCursor = true,
      size = 28,
      trailCount = 5,
      style,
      ...props
    },
    ref
  ) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const trailRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
    const activeRef = React.useRef(false);
    const [active, setActive] = React.useState(false);
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
        }
      };
      const tick = () => {
        const state = position.current;
        state.x += (state.tx - state.x) * 0.32;
        state.y += (state.ty - state.y) * 0.32;

        let followX = state.x;
        let followY = state.y;
        state.trail.forEach((point, index) => {
          point.x += (followX - point.x) * (0.26 - Math.min(index, 4) * 0.025);
          point.y += (followY - point.y) * (0.26 - Math.min(index, 4) * 0.025);
          followX = point.x;
          followY = point.y;
          const node = trailRefs.current[index];
          if (node) {
            node.style.transform = `translate3d(${point.x - size / 2}px, ${point.y - size / 2}px, 0)`;
          }
        });

        if (localRef.current) {
          localRef.current.style.transform = `translate3d(${state.x - size / 2}px, ${state.y - size / 2}px, 0)`;
        }
        frame = window.requestAnimationFrame(tick);
      };
      window.addEventListener("pointermove", onMove);
      frame = window.requestAnimationFrame(tick);
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.cancelAnimationFrame(frame);
      };
    }, [enabled, size]);

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
              "pointer-events-none fixed left-0 top-0 z-[9998] hidden transition-opacity duration-150 md:block",
              trailClasses[variant]
            )}
            style={{
              width: size,
              height: size,
              opacity: Math.max(0.06, (active ? 0.18 : 0.28) - index * 0.04),
              ...style,
            }}
          />
        ))}
        <div
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed left-0 top-0 z-[9999] hidden will-change-transform md:block",
            className
          )}
          style={{
            width: size,
            height: size,
            ...style,
          }}
          {...props}
        >
          <span
            className={cn(
              "block h-full w-full origin-center transition-[transform,opacity] duration-700 ease-out",
              active ? "scale-[1.35] opacity-60" : "scale-100 opacity-100",
              variantClasses[variant]
            )}
          />
        </div>
      </>
    );
  }
);
ComicCursor.displayName = "ComicCursor";
