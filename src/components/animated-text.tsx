import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const ANIM_STYLE_ID = "comixa-animated-text-keyframes";
const ANIM_CSS = `
@keyframes comixa-letter-in {
  0% { transform: translateY(0.55em) rotate(-8deg); opacity: 0; }
  60% { transform: translateY(-0.08em) rotate(2deg); opacity: 1; }
  100% { transform: translateY(0) rotate(0deg); opacity: 1; }
}
@keyframes comixa-caret-blink {
  0%, 45% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes comixa-highlight-wipe {
  0% { background-size: 0% 100%; }
  100% { background-size: 100% 100%; }
}
[data-comixa-letter][data-state="in"] {
  animation: comixa-letter-in var(--comixa-letter-duration, 0.45s) cubic-bezier(0.34, 1.45, 0.64, 1) both;
  animation-delay: var(--comixa-letter-delay, 0ms);
}
[data-comixa-caret] {
  animation: comixa-caret-blink 1s steps(1) infinite;
}
[data-comixa-highlight][data-state="in"] {
  animation: comixa-highlight-wipe var(--comixa-highlight-duration, 0.7s) ease-out both;
  animation-delay: var(--comixa-highlight-delay, 0ms);
}
`;

function ensureAnimatedTextStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(ANIM_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = ANIM_STYLE_ID;
  style.textContent = ANIM_CSS;
  document.head.appendChild(style);
}

type TextTag =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "strong"
  | "em"
  | "mark";

/** How many times the animation should play. Use `Infinity` to loop forever. */
export type AnimationRepeat = number;

function useInView(
  enabled: boolean,
  once: boolean
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(!enabled);

  React.useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, once]);

  return [ref, visible];
}

/**
 * Increments a cycle key so CSS animations remount / restart.
 * `repeat={1}` plays once; `repeat={Infinity}` restarts forever.
 */
function useRepeatCycle(
  active: boolean,
  cycleMs: number,
  repeat: AnimationRepeat
): number {
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    if (!Number.isFinite(repeat) && repeat !== Infinity) return;
    if (repeat === 1) return;

    let plays = 1;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const canContinue =
        repeat === Infinity || (Number.isFinite(repeat) && plays < repeat);
      if (!canContinue) return;
      timer = setTimeout(() => {
        plays += 1;
        setCycle((c) => c + 1);
        schedule();
      }, cycleMs);
    };

    schedule();
    return () => clearTimeout(timer);
  }, [active, cycleMs, repeat]);

  return cycle;
}

function toPlainText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(toPlainText).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return toPlainText(children.props.children);
  }
  return "";
}

function assignRef<T>(ref: React.ForwardedRef<T>, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
}

/* ---------- LetterReveal ---------- */

export interface LetterRevealProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: TextTag;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Pause before restarting (ms). Default 900 */
  pause?: number;
  /** How many times to play. `Infinity` = forever. Default `Infinity` */
  repeat?: AnimationRepeat;
  once?: boolean;
  start?: "inView" | "immediate";
}

export const LetterReveal = React.forwardRef<HTMLElement, LetterRevealProps>(
  (
    {
      as: Tag = "span",
      className,
      children,
      delay = 0,
      duration = 450,
      stagger = 35,
      pause = 900,
      repeat = Infinity,
      once = true,
      start = "inView",
      style,
      ...props
    },
    forwardedRef
  ) => {
    React.useEffect(() => {
      ensureAnimatedTextStyles();
    }, []);

    const [viewRef, visible] = useInView(start === "inView", once);
    const text = toPlainText(children);
    const chars = Array.from(text);
    const cycleMs =
      delay + Math.max(chars.length, 1) * stagger + duration + pause;
    const cycle = useRepeatCycle(visible, cycleMs, repeat);

    return (
      <Tag
        ref={(node) => {
          viewRef.current = node;
          assignRef(forwardedRef, node);
        }}
        className={cn(
          "inline-block font-comic uppercase tracking-wide text-ink",
          className
        )}
        style={style}
        aria-label={text}
        {...props}
      >
        {chars.map((char, i) => (
          <span
            key={`${cycle}-${i}`}
            data-comixa-letter=""
            data-state={visible ? "in" : "out"}
            className="inline-block whitespace-pre"
            style={
              {
                opacity: visible ? undefined : 0,
                ["--comixa-letter-duration" as string]: `${duration}ms`,
                ["--comixa-letter-delay" as string]: visible
                  ? `${delay + i * stagger}ms`
                  : "0ms",
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Tag>
    );
  }
);
LetterReveal.displayName = "LetterReveal";

/* ---------- Typewriter ---------- */

export interface TypewriterProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: TextTag;
  children: React.ReactNode;
  speed?: number;
  delay?: number;
  /** Pause before restarting (ms). Default 1200 */
  pause?: number;
  /** How many times to type the text. `Infinity` = forever. Default `Infinity` */
  repeat?: AnimationRepeat;
  /** @deprecated Use `repeat={Infinity}` instead */
  loop?: boolean;
  caret?: boolean;
  once?: boolean;
  start?: "inView" | "immediate";
}

export const Typewriter = React.forwardRef<HTMLElement, TypewriterProps>(
  (
    {
      as: Tag = "span",
      className,
      children,
      speed = 45,
      delay = 0,
      pause = 1200,
      repeat,
      loop,
      caret = true,
      once = true,
      start = "inView",
      ...props
    },
    forwardedRef
  ) => {
    React.useEffect(() => {
      ensureAnimatedTextStyles();
    }, []);

    const resolvedRepeat: AnimationRepeat =
      repeat ?? (loop === false ? 1 : Infinity);

    const [viewRef, visible] = useInView(start === "inView", once);
    const full = toPlainText(children);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!visible) {
        setCount(0);
        return;
      }

      let i = 0;
      let plays = 1;
      let timer: ReturnType<typeof setTimeout>;
      let cancelled = false;

      const typeNext = () => {
        if (cancelled) return;
        i += 1;
        setCount(i);
        if (i < full.length) {
          timer = setTimeout(typeNext, speed);
          return;
        }
        const canRepeat =
          resolvedRepeat === Infinity ||
          (Number.isFinite(resolvedRepeat) && plays < resolvedRepeat);
        if (!canRepeat) return;
        timer = setTimeout(() => {
          if (cancelled) return;
          plays += 1;
          i = 0;
          setCount(0);
          timer = setTimeout(typeNext, speed);
        }, pause);
      };

      timer = setTimeout(typeNext, delay);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }, [visible, full, speed, delay, pause, resolvedRepeat]);

    return (
      <Tag
        ref={(node) => {
          viewRef.current = node;
          assignRef(forwardedRef, node);
        }}
        className={cn("inline font-body text-ink", className)}
        aria-label={full}
        {...props}
      >
        <span aria-hidden="true">{full.slice(0, count)}</span>
        {caret ? (
          <span
            data-comixa-caret=""
            className="ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-[0.1em] bg-ink align-baseline"
            aria-hidden="true"
          />
        ) : null}
      </Tag>
    );
  }
);
Typewriter.displayName = "Typewriter";

/* ---------- ComicText ---------- */

export const comicTextVariants = cva(
  "inline-block font-comic uppercase tracking-wide text-ink",
  {
    variants: {
      size: {
        sm: "text-xl",
        md: "text-3xl",
        lg: "text-5xl",
        xl: "text-6xl",
      },
      effect: {
        none: "",
        pop: "animate-comic-pop",
        shake: "animate-comic-shake",
        wiggle: "animate-comic-wiggle",
      },
      tilt: {
        none: "",
        left: "-rotate-2",
        right: "rotate-2",
        wild: "rotate-3 -skew-x-3",
      },
      tone: {
        ink: "text-ink",
        yellow: "text-comic-yellow drop-shadow-[2px_2px_0_#1A1A1A]",
        red: "text-comic-red",
        blue: "text-comic-blue",
        pink: "text-comic-pink",
        green: "text-comic-green",
      },
    },
    defaultVariants: {
      size: "md",
      effect: "none",
      tilt: "none",
      tone: "ink",
    },
  }
);

const EFFECT_CYCLE_MS: Record<string, number> = {
  pop: 1200,
  shake: 1400,
  wiggle: 1000,
  none: 0,
};

export interface ComicTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof comicTextVariants> {
  as?: TextTag;
  /** Pause between effect replay (ms). Default 700 */
  pause?: number;
  /** How many times to play the effect. `Infinity` = forever. Default `Infinity` */
  repeat?: AnimationRepeat;
  once?: boolean;
  start?: "inView" | "immediate";
}

export const ComicText = React.forwardRef<HTMLElement, ComicTextProps>(
  (
    {
      as: Tag = "span",
      className,
      size,
      effect = "none",
      tilt,
      tone,
      pause = 700,
      repeat = Infinity,
      once = true,
      start = "immediate",
      children,
      ...props
    },
    forwardedRef
  ) => {
    const [viewRef, visible] = useInView(start === "inView", once);
    const effectKey = effect ?? "none";
    const baseMs = EFFECT_CYCLE_MS[effectKey] ?? 1200;
    const cycle = useRepeatCycle(
      visible && effectKey !== "none",
      baseMs + pause,
      repeat
    );

    return (
      <Tag
        ref={(node) => {
          viewRef.current = node;
          assignRef(forwardedRef, node);
        }}
        className={cn(
          comicTextVariants({
            size,
            effect: "none",
            tilt,
            tone,
          }),
          className
        )}
        {...props}
      >
        <span
          key={cycle}
          className={cn(
            "inline-block",
            visible &&
              effectKey === "pop" &&
              "animate-comic-pop",
            visible &&
              effectKey === "shake" &&
              "animate-comic-shake",
            visible &&
              effectKey === "wiggle" &&
              "animate-comic-wiggle"
          )}
        >
          {children}
        </span>
      </Tag>
    );
  }
);
ComicText.displayName = "ComicText";

/* ---------- Highlight ---------- */

export const highlightVariants = cva(
  "inline bg-transparent bg-no-repeat px-1 font-body font-bold text-ink",
  {
    variants: {
      tone: {
        yellow: "",
        pink: "",
        blue: "",
        green: "",
        orange: "",
      },
    },
    defaultVariants: {
      tone: "yellow",
    },
  }
);

const HIGHLIGHT_COLORS: Record<
  NonNullable<VariantProps<typeof highlightVariants>["tone"]>,
  string
> = {
  yellow: "#FFE566",
  pink: "#FF7AB6",
  blue: "rgba(77,159,255,0.55)",
  green: "rgba(91,214,122,0.7)",
  orange: "#FF9F43",
};

export interface HighlightProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof highlightVariants> {
  as?: TextTag;
  delay?: number;
  duration?: number;
  /** Pause before restarting wipe (ms). Default 900 */
  pause?: number;
  /** How many times to play. `Infinity` = forever. Default `Infinity` */
  repeat?: AnimationRepeat;
  once?: boolean;
  start?: "inView" | "immediate";
}

export const Highlight = React.forwardRef<HTMLElement, HighlightProps>(
  (
    {
      as: Tag = "mark",
      className,
      tone = "yellow",
      delay = 0,
      duration = 700,
      pause = 900,
      repeat = Infinity,
      once = true,
      start = "inView",
      children,
      style,
      ...props
    },
    forwardedRef
  ) => {
    React.useEffect(() => {
      ensureAnimatedTextStyles();
    }, []);

    const [viewRef, visible] = useInView(start === "inView", once);
    const color = HIGHLIGHT_COLORS[tone ?? "yellow"];
    const cycle = useRepeatCycle(visible, delay + duration + pause, repeat);

    return (
      <Tag
        ref={(node) => {
          viewRef.current = node;
          assignRef(forwardedRef, node);
        }}
        className={cn(highlightVariants({ tone }), className)}
        style={style}
        {...props}
      >
        <span
          key={cycle}
          data-comixa-highlight=""
          data-state={visible ? "in" : "out"}
          className="bg-transparent bg-no-repeat"
          style={
            {
              backgroundImage: `linear-gradient(transparent 40%, ${color} 40%, ${color} 92%, transparent 92%)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 0",
              backgroundSize: visible ? undefined : "0% 100%",
              ["--comixa-highlight-duration" as string]: `${duration}ms`,
              ["--comixa-highlight-delay" as string]: visible
                ? `${delay}ms`
                : "0ms",
              WebkitBoxDecorationBreak: "clone",
              boxDecorationBreak: "clone",
            } as React.CSSProperties
          }
        >
          {children}
        </span>
      </Tag>
    );
  }
);
Highlight.displayName = "Highlight";
