import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";

export const badgeVariants = cva(
  [
    "relative isolate inline-flex items-center justify-center gap-1 overflow-hidden border-2 font-comic uppercase tracking-wide",
    "[border-color:var(--comixa-badge-border)] [background:var(--comixa-badge-bg)] [color:var(--comixa-badge-text)] [box-shadow:var(--comixa-badge-shadow-value)]",
    "[font-family:var(--comixa-button-font,'Bangers','Comic_Sans_MS',cursive)] [letter-spacing:var(--comixa-button-letter-spacing,0.025em)]",
    "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:content-[''] before:[background-image:var(--comixa-badge-pattern)] before:[background-size:var(--comixa-badge-pattern-size)] before:opacity-[var(--comixa-badge-pattern-opacity)]",
    "[&>*]:relative [&>*]:z-10",
  ].join(" "),
  {
    variants: {
      variant: {
        yellow:
          "[--comixa-badge-bg:var(--comixa-warning-bg,#FFD84D)] [--comixa-badge-text:var(--comixa-warning-text,#111111)] [--comixa-badge-border:var(--comixa-warning-border,#1E1E1E)] [--comixa-badge-shadow-value:var(--comixa-warning-shadow-value,2px_2px_0_0_var(--comixa-warning-shadow,#1E1E1E))] [--comixa-badge-pattern:var(--comixa-warning-pattern,none)] [--comixa-badge-pattern-size:var(--comixa-warning-pattern-size,auto)] [--comixa-badge-pattern-opacity:var(--comixa-warning-pattern-opacity,0)]",
        red:
          "[--comixa-badge-bg:var(--comixa-danger-bg,#FF5757)] [--comixa-badge-text:var(--comixa-danger-text,#FFFFFF)] [--comixa-badge-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-badge-shadow-value:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-badge-pattern:var(--comixa-danger-pattern,none)] [--comixa-badge-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-badge-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        blue:
          "[--comixa-badge-bg:var(--comixa-primary-bg,#4F9CF9)] [--comixa-badge-text:var(--comixa-primary-text,#FFFFFF)] [--comixa-badge-border:var(--comixa-primary-border,#1E1E1E)] [--comixa-badge-shadow-value:var(--comixa-primary-shadow-value,2px_2px_0_0_var(--comixa-primary-shadow,#1E1E1E))] [--comixa-badge-pattern:var(--comixa-primary-pattern,none)] [--comixa-badge-pattern-size:var(--comixa-primary-pattern-size,auto)] [--comixa-badge-pattern-opacity:var(--comixa-primary-pattern-opacity,0)]",
        green:
          "[--comixa-badge-bg:var(--comixa-success-bg,#4ADE80)] [--comixa-badge-text:var(--comixa-success-text,#111111)] [--comixa-badge-border:var(--comixa-success-border,#1E1E1E)] [--comixa-badge-shadow-value:var(--comixa-success-shadow-value,2px_2px_0_0_var(--comixa-success-shadow,#1E1E1E))] [--comixa-badge-pattern:var(--comixa-success-pattern,none)] [--comixa-badge-pattern-size:var(--comixa-success-pattern-size,auto)] [--comixa-badge-pattern-opacity:var(--comixa-success-pattern-opacity,0)]",
        pink:
          "[--comixa-badge-bg:var(--comixa-danger-bg,#FF7AB6)] [--comixa-badge-text:var(--comixa-danger-text,#111111)] [--comixa-badge-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-badge-shadow-value:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-badge-pattern:var(--comixa-danger-pattern,none)] [--comixa-badge-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-badge-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        orange:
          "[--comixa-badge-bg:var(--comixa-default-bg,var(--comixa-warning-bg,#FF9F1C))] [--comixa-badge-text:var(--comixa-default-text,var(--comixa-warning-text,#111111))] [--comixa-badge-border:var(--comixa-default-border,var(--comixa-warning-border,#1E1E1E))] [--comixa-badge-shadow-value:var(--comixa-default-shadow-value,2px_2px_0_0_var(--comixa-default-shadow,var(--comixa-warning-shadow,#1E1E1E)))] [--comixa-badge-pattern:var(--comixa-default-pattern,var(--comixa-warning-pattern,none))] [--comixa-badge-pattern-size:var(--comixa-default-pattern-size,var(--comixa-warning-pattern-size,auto))] [--comixa-badge-pattern-opacity:var(--comixa-default-pattern-opacity,var(--comixa-warning-pattern-opacity,0))]",
        outline:
          "[--comixa-badge-bg:var(--comixa-outline-bg,#FFFFFF)] [--comixa-badge-text:var(--comixa-outline-text,#111111)] [--comixa-badge-border:var(--comixa-outline-border,#1E1E1E)] [--comixa-badge-shadow-value:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))] [--comixa-badge-pattern:var(--comixa-outline-pattern,none)] [--comixa-badge-pattern-size:var(--comixa-outline-pattern-size,auto)] [--comixa-badge-pattern-opacity:var(--comixa-outline-pattern-opacity,0)]",
        ink: "[--comixa-badge-bg:#1A1A1A] [--comixa-badge-text:#FFFFFF] [--comixa-badge-border:#1A1A1A] [--comixa-badge-shadow-value:2px_2px_0_0_#1A1A1A] [--comixa-badge-pattern:none] [--comixa-badge-pattern-size:auto] [--comixa-badge-pattern-opacity:0] !text-white",
        soft:
          "border-dashed [--comixa-badge-bg:var(--comixa-outline-bg,#FFF3D6)] [--comixa-badge-text:var(--comixa-outline-text,#111111)] [--comixa-badge-border:var(--comixa-outline-border,#1E1E1E)] [--comixa-badge-shadow-value:none] [--comixa-badge-pattern:var(--comixa-outline-pattern,none)] [--comixa-badge-pattern-size:var(--comixa-outline-pattern-size,auto)] [--comixa-badge-pattern-opacity:var(--comixa-outline-pattern-opacity,0)]",
      },
      size: {
        sm: "px-2 py-0.5 text-xs [border-radius:var(--comixa-button-radius,0.5rem)]",
        md: "px-2.5 py-1 text-sm [border-radius:var(--comixa-button-radius,0.5rem)]",
        lg: "px-3 py-1.5 text-base [border-radius:var(--comixa-button-radius,0.5rem)]",
      },
    },
    defaultVariants: {
      variant: "yellow",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants>,
    ThemeableProps {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, theme, style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-comixa-badge=""
        data-comixa-badge-variant={variant ?? "yellow"}
        data-comixa-theme={theme}
        className={cn(badgeVariants({ variant, size }), className)}
        style={mergeComixaThemeStyle(theme, style)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
