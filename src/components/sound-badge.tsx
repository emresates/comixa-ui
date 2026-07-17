import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const SOUND_WORDS = [
  "POW",
  "BAM",
  "WOW",
  "BOOM",
  "ZAP",
  "CRASH",
  "WHAM",
  "BANG",
  "KAPOW",
  "SPLASH",
] as const;

export type SoundWord = (typeof SOUND_WORDS)[number];

export const soundBadgeVariants = cva(
  [
    "relative isolate inline-flex select-none items-center justify-center overflow-hidden border-2",
    "font-comic uppercase leading-none tracking-wide",
    "[border-color:var(--comixa-sound-border)] [background:var(--comixa-sound-bg)] [color:var(--comixa-sound-text)] [box-shadow:var(--comixa-sound-shadow-value)]",
    "[font-family:var(--comixa-button-font,'Bangers','Comic_Sans_MS',cursive)] [letter-spacing:var(--comixa-button-letter-spacing,0.025em)]",
    "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:content-[''] before:[background-image:var(--comixa-sound-pattern)] before:[background-size:var(--comixa-sound-pattern-size)] before:opacity-[var(--comixa-sound-pattern-opacity)]",
    "rotate-[-6deg]",
  ].join(" "),
  {
    variants: {
      variant: {
        pow:
          "[--comixa-sound-bg:var(--comixa-warning-bg,#FFD84D)] [--comixa-sound-text:var(--comixa-warning-text,#111111)] [--comixa-sound-border:var(--comixa-warning-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-warning-shadow-value,4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-warning-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-warning-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-warning-pattern-opacity,0)]",
        bam:
          "rotate-[4deg] [--comixa-sound-bg:var(--comixa-danger-bg,#FF5757)] [--comixa-sound-text:var(--comixa-danger-text,#FFFFFF)] [--comixa-sound-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-danger-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        wow:
          "rotate-[-3deg] [--comixa-sound-bg:var(--comixa-default-bg,var(--comixa-warning-bg,#FF7AB6))] [--comixa-sound-text:var(--comixa-default-text,var(--comixa-warning-text,#111111))] [--comixa-sound-border:var(--comixa-default-border,var(--comixa-warning-border,#1E1E1E))] [--comixa-sound-shadow-value:var(--comixa-default-shadow-value,4px_4px_0_0_var(--comixa-default-shadow,var(--comixa-warning-shadow,#1E1E1E)))] [--comixa-sound-pattern:var(--comixa-default-pattern,var(--comixa-warning-pattern,none))] [--comixa-sound-pattern-size:var(--comixa-default-pattern-size,var(--comixa-warning-pattern-size,auto))] [--comixa-sound-pattern-opacity:var(--comixa-default-pattern-opacity,var(--comixa-warning-pattern-opacity,0))]",
        boom:
          "rotate-[8deg] !text-white [--comixa-sound-bg:var(--comixa-danger-bg,#FF9F1C)] [--comixa-sound-text:#FFFFFF] [--comixa-sound-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-danger-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        zap:
          "rotate-[-8deg] [--comixa-sound-bg:var(--comixa-primary-bg,#4F9CF9)] [--comixa-sound-text:var(--comixa-primary-text,#FFFFFF)] [--comixa-sound-border:var(--comixa-primary-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-primary-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-primary-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-primary-pattern-opacity,0)]",
        crash:
          "rotate-[5deg] [--comixa-sound-bg:var(--comixa-success-bg,#4ADE80)] [--comixa-sound-text:var(--comixa-success-text,#111111)] [--comixa-sound-border:var(--comixa-success-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-success-shadow-value,4px_4px_0_0_var(--comixa-success-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-success-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-success-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-success-pattern-opacity,0)]",
        wham:
          "rotate-[-2deg] [--comixa-sound-bg:#1A1A1A] [--comixa-sound-text:var(--comixa-warning-bg,#FFD84D)] [--comixa-sound-border:#1A1A1A] [--comixa-sound-shadow-value:4px_4px_0_0_#1A1A1A] [--comixa-sound-pattern:none] [--comixa-sound-pattern-size:auto] [--comixa-sound-pattern-opacity:0]",
        bang:
          "rotate-[6deg] [--comixa-sound-bg:var(--comixa-danger-bg,#FF5757)] [--comixa-sound-text:var(--comixa-warning-bg,#FFD84D)] [--comixa-sound-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-danger-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        kapow:
          "rotate-[-10deg] [--comixa-sound-bg:var(--comixa-warning-bg,#FFD84D)] [--comixa-sound-text:var(--comixa-danger-bg,#FF5757)] [--comixa-sound-border:var(--comixa-warning-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-warning-shadow-value,4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-warning-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-warning-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-warning-pattern-opacity,0)]",
        splash:
          "rotate-[3deg] [--comixa-sound-bg:var(--comixa-primary-bg,#4F9CF9)] [--comixa-sound-text:var(--comixa-primary-text,#FFFFFF)] [--comixa-sound-border:var(--comixa-primary-border,#1E1E1E)] [--comixa-sound-shadow-value:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))] [--comixa-sound-pattern:var(--comixa-primary-pattern,none)] [--comixa-sound-pattern-size:var(--comixa-primary-pattern-size,auto)] [--comixa-sound-pattern-opacity:var(--comixa-primary-pattern-opacity,0)]",
      },
      size: {
        sm: "rounded-md px-2 py-1 text-sm",
        md: "rounded-lg px-3 py-1.5 text-xl",
        lg: "rounded-xl px-4 py-2 text-3xl",
      },
      burst: {
        true: "[clip-path:polygon(50%_0%,62%_14%,80%_8%,76%_28%,98%_35%,80%_48%,100%_55%,80%_62%,98%_75%,76%_78%,80%_95%,62%_86%,50%_100%,38%_86%,20%_95%,24%_78%,2%_75%,20%_62%,0%_55%,20%_48%,2%_35%,24%_28%,20%_8%,38%_14%)] border-0 shadow-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "pow",
      size: "md",
      burst: false,
    },
  }
);

const defaultWord: Record<
  NonNullable<VariantProps<typeof soundBadgeVariants>["variant"]>,
  string
> = {
  pow: "POW!",
  bam: "BAM!",
  wow: "WOW!",
  boom: "BOOM!",
  zap: "ZAP!",
  crash: "CRASH!",
  wham: "WHAM!",
  bang: "BANG!",
  kapow: "KAPOW!",
  splash: "SPLASH!",
};

export interface SoundBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof soundBadgeVariants> {
  /** Override text — defaults to the variant word (POW!, BAM!, …). */
  word?: string;
}

export const SoundBadge = React.forwardRef<HTMLSpanElement, SoundBadgeProps>(
  ({ className, variant = "pow", size, burst, word, children, ...props }, ref) => {
    const label =
      children ?? word ?? defaultWord[variant ?? "pow"] ?? "POW!";

    return (
      <span
        ref={ref}
        data-comixa-sound-badge=""
        data-comixa-sound-badge-variant={variant ?? "pow"}
        className={cn(
          soundBadgeVariants({ variant, size, burst }),
          burst && "relative px-5 py-4",
          className
        )}
        {...props}
      >
        {burst ? (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 scale-110 bg-ink [clip-path:polygon(50%_0%,62%_14%,80%_8%,76%_28%,98%_35%,80%_48%,100%_55%,80%_62%,98%_75%,76%_78%,80%_95%,62%_86%,50%_100%,38%_86%,20%_95%,24%_78%,2%_75%,20%_62%,0%_55%,20%_48%,2%_35%,24%_28%,20%_8%,38%_14%)]"
          />
        ) : null}
        <span className="relative z-[1]">{label}</span>
      </span>
    );
  }
);
SoundBadge.displayName = "SoundBadge";
