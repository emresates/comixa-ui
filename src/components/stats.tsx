import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const statsVariants = cva("grid w-full gap-4", {
  variants: {
    columns: {
      2: "grid-cols-2",
      3: "grid-cols-2 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 4,
  },
});

export interface StatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsVariants> {}

export const Stats = React.forwardRef<HTMLDivElement, StatsProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statsVariants({ columns }), className)}
      {...props}
    />
  )
);
Stats.displayName = "Stats";

export const statVariants = cva(
  [
    "flex flex-col items-start gap-1 rounded-xl border-2 border-ink p-4",
    "shadow-comic-sm font-body text-ink",
  ].join(" "),
  {
    variants: {
      tone: {
        default: "bg-paper",
        cream: "bg-paper-cream",
        yellow: "bg-comic-yellow",
        blue: "bg-comic-blue text-white",
        red: "bg-comic-red text-white",
        green: "bg-comic-green",
        pink: "bg-comic-pink",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  }
);

function parseNumeric(value: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} | null {
  const match = value.trim().match(/^([^0-9+-]*)([+-]?\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;
  const raw = match[2].replace(",", ".");
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return {
    prefix: match[1],
    number: Number(raw),
    suffix: match[3],
    decimals,
  };
}

function useCountUp(target: number, enabled: boolean, decimals: number) {
  const [current, setCurrent] = React.useState(enabled ? 0 : target);

  React.useEffect(() => {
    if (!enabled) {
      setCurrent(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled]);

  return decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
}

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {
  value: React.ReactNode;
  label: React.ReactNode;
  hint?: React.ReactNode;
  /** Animate numeric string values when they enter the viewport */
  animate?: boolean;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    {
      className,
      tone,
      size,
      value,
      label,
      hint,
      animate = false,
      ...props
    },
    ref
  ) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = React.useState(!animate);
    const parsed = typeof value === "string" ? parseNumeric(value) : null;

    React.useEffect(() => {
      if (!animate || !parsed) {
        setInView(true);
        return;
      }
      const el = localRef.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        setInView(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [animate, parsed]);

    const animatedNumber = useCountUp(
      parsed?.number ?? 0,
      Boolean(animate && parsed && inView),
      parsed?.decimals ?? 0
    );

    const display =
      animate && parsed
        ? `${parsed.prefix}${animatedNumber}${parsed.suffix}`
        : value;

    return (
      <div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(statVariants({ tone, size }), className)}
        {...props}
      >
        <div
          className={cn(
            "font-comic uppercase tracking-wide",
            size === "lg" ? "text-5xl" : size === "sm" ? "text-2xl" : "text-4xl"
          )}
        >
          {display}
        </div>
        <div className="font-comic text-sm uppercase tracking-wide opacity-90">
          {label}
        </div>
        {hint ? <div className="text-xs opacity-70">{hint}</div> : null}
      </div>
    );
  }
);
Stat.displayName = "Stat";
