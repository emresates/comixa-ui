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

type StatsTriggerValue = {
  triggerOnView: boolean;
  visible: boolean;
};

const StatsTriggerContext = React.createContext<StatsTriggerValue | null>(null);

export interface StatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsVariants> {
  /** Start animated child stats when the whole Stats grid enters the viewport */
  triggerOnView?: boolean;
}

export const Stats = React.forwardRef<HTMLDivElement, StatsProps>(
  ({ className, columns, triggerOnView = false, children, ...props }, ref) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = React.useState(!triggerOnView);

    React.useEffect(() => {
      if (!triggerOnView) {
        setVisible(true);
        return;
      }

      const el = localRef.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        setVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [triggerOnView]);

    return (
      <StatsTriggerContext.Provider value={{ triggerOnView, visible }}>
        <div
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          className={cn(statsVariants({ columns }), className)}
          {...props}
        >
          {children}
        </div>
      </StatsTriggerContext.Provider>
    );
  }
);
Stats.displayName = "Stats";

export const statVariants = cva(
  [
    "flex flex-col items-start gap-1 p-4",
    "font-body [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.75rem)]",
  ].join(" "),
  {
    variants: {
      tone: {
        default:
          "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        cream:
          "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)] [border-color:var(--comixa-default-border,#1E1E1E)] [box-shadow:var(--comixa-default-shadow-value,2px_2px_0_0_var(--comixa-default-shadow,#1E1E1E))]",
        yellow:
          "[background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)] [box-shadow:var(--comixa-warning-shadow-value,2px_2px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
        blue:
          "[background:var(--comixa-primary-bg,#4F9CF9)] [color:var(--comixa-primary-text,#FFFFFF)] [border-color:var(--comixa-primary-border,#1E1E1E)] [box-shadow:var(--comixa-primary-shadow-value,2px_2px_0_0_var(--comixa-primary-shadow,#1E1E1E))]",
        red:
          "[background:var(--comixa-danger-bg,#FF5757)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)] [box-shadow:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
        green:
          "[background:var(--comixa-success-bg,#4ADE80)] [color:var(--comixa-success-text,#111111)] [border-color:var(--comixa-success-border,#1E1E1E)] [box-shadow:var(--comixa-success-shadow-value,2px_2px_0_0_var(--comixa-success-shadow,#1E1E1E))]",
        pink:
          "[background:var(--comixa-danger-bg,#FF4FA3)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)] [box-shadow:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
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
  /** Start count-up when this Stat enters the viewport */
  triggerOnView?: boolean;
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
      triggerOnView,
      ...props
    },
    ref
  ) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const parentTrigger = React.useContext(StatsTriggerContext);
    const shouldTriggerOnView =
      triggerOnView ?? (parentTrigger?.triggerOnView ? false : animate);
    const [inView, setInView] = React.useState(!shouldTriggerOnView);
    const parsed = typeof value === "string" ? parseNumeric(value) : null;

    React.useEffect(() => {
      if (parentTrigger?.triggerOnView) {
        setInView(parentTrigger.visible);
        return;
      }

      if (!shouldTriggerOnView || !parsed) {
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
    }, [parentTrigger, shouldTriggerOnView, parsed]);

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
