import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";

export const stickerVariants = cva(
  [
    "relative isolate inline-flex select-none items-center justify-center overflow-hidden border-2",
    "font-comic uppercase tracking-wide",
    "[border-color:var(--comixa-sticker-border)] [background:var(--comixa-sticker-bg)] [color:var(--comixa-sticker-text)] [box-shadow:var(--comixa-sticker-shadow-value)]",
    "[font-family:var(--comixa-button-font,'Bangers','Comic_Sans_MS',cursive)] [letter-spacing:var(--comixa-button-letter-spacing,0.025em)]",
    "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:content-[''] before:[background-image:var(--comixa-sticker-pattern)] before:[background-size:var(--comixa-sticker-pattern-size)] before:opacity-[var(--comixa-sticker-pattern-opacity)]",
    "[&>*]:relative [&>*]:z-10",
    "transition-transform duration-150 hover:-rotate-3 hover:scale-105",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[--comixa-sticker-bg:var(--comixa-outline-bg,#FFFFFF)] [--comixa-sticker-text:var(--comixa-outline-text,#111111)] [--comixa-sticker-border:var(--comixa-outline-border,#1E1E1E)] [--comixa-sticker-shadow-value:var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E))] [--comixa-sticker-pattern:var(--comixa-outline-pattern,none)] [--comixa-sticker-pattern-size:var(--comixa-outline-pattern-size,auto)] [--comixa-sticker-pattern-opacity:var(--comixa-outline-pattern-opacity,0)]",
        yellow:
          "[--comixa-sticker-bg:var(--comixa-warning-bg,#FFD84D)] [--comixa-sticker-text:var(--comixa-warning-text,#111111)] [--comixa-sticker-border:var(--comixa-warning-border,#1E1E1E)] [--comixa-sticker-shadow-value:var(--comixa-warning-shadow-value,4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E))] [--comixa-sticker-pattern:var(--comixa-warning-pattern,none)] [--comixa-sticker-pattern-size:var(--comixa-warning-pattern-size,auto)] [--comixa-sticker-pattern-opacity:var(--comixa-warning-pattern-opacity,0)]",
        red:
          "[--comixa-sticker-bg:var(--comixa-danger-bg,#FF5757)] [--comixa-sticker-text:var(--comixa-danger-text,#FFFFFF)] [--comixa-sticker-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-sticker-shadow-value:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-sticker-pattern:var(--comixa-danger-pattern,none)] [--comixa-sticker-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-sticker-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        blue:
          "[--comixa-sticker-bg:var(--comixa-primary-bg,#4F9CF9)] [--comixa-sticker-text:var(--comixa-primary-text,#FFFFFF)] [--comixa-sticker-border:var(--comixa-primary-border,#1E1E1E)] [--comixa-sticker-shadow-value:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))] [--comixa-sticker-pattern:var(--comixa-primary-pattern,none)] [--comixa-sticker-pattern-size:var(--comixa-primary-pattern-size,auto)] [--comixa-sticker-pattern-opacity:var(--comixa-primary-pattern-opacity,0)]",
        green:
          "[--comixa-sticker-bg:var(--comixa-success-bg,#4ADE80)] [--comixa-sticker-text:var(--comixa-success-text,#111111)] [--comixa-sticker-border:var(--comixa-success-border,#1E1E1E)] [--comixa-sticker-shadow-value:var(--comixa-success-shadow-value,4px_4px_0_0_var(--comixa-success-shadow,#1E1E1E))] [--comixa-sticker-pattern:var(--comixa-success-pattern,none)] [--comixa-sticker-pattern-size:var(--comixa-success-pattern-size,auto)] [--comixa-sticker-pattern-opacity:var(--comixa-success-pattern-opacity,0)]",
        pink:
          "[--comixa-sticker-bg:var(--comixa-danger-bg,#FF7AB6)] [--comixa-sticker-text:var(--comixa-danger-text,#111111)] [--comixa-sticker-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-sticker-shadow-value:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-sticker-pattern:var(--comixa-danger-pattern,none)] [--comixa-sticker-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-sticker-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        orange:
          "[--comixa-sticker-bg:var(--comixa-default-bg,var(--comixa-warning-bg,#FF9F1C))] [--comixa-sticker-text:var(--comixa-default-text,var(--comixa-warning-text,#111111))] [--comixa-sticker-border:var(--comixa-default-border,var(--comixa-warning-border,#1E1E1E))] [--comixa-sticker-shadow-value:var(--comixa-default-shadow-value,4px_4px_0_0_var(--comixa-default-shadow,var(--comixa-warning-shadow,#1E1E1E)))] [--comixa-sticker-pattern:var(--comixa-default-pattern,var(--comixa-warning-pattern,none))] [--comixa-sticker-pattern-size:var(--comixa-default-pattern-size,var(--comixa-warning-pattern-size,auto))] [--comixa-sticker-pattern-opacity:var(--comixa-default-pattern-opacity,var(--comixa-warning-pattern-opacity,0))]",
        ink: "[--comixa-sticker-bg:#1A1A1A] [--comixa-sticker-text:#FFFFFF] [--comixa-sticker-border:#1A1A1A] [--comixa-sticker-shadow-value:4px_4px_0_0_#1A1A1A] [--comixa-sticker-pattern:none] [--comixa-sticker-pattern-size:auto] [--comixa-sticker-pattern-opacity:0] !text-white",
      },
      size: {
        sm: "min-h-12 min-w-12 rounded-md px-2 py-1 text-xs",
        md: "min-h-16 min-w-16 rounded-lg px-3 py-2 text-sm",
        lg: "min-h-24 min-w-24 rounded-xl px-4 py-3 text-lg",
      },
      tilt: {
        none: "rotate-0",
        left: "-rotate-6",
        right: "rotate-6",
        wild: "rotate-[-12deg]",
      },
      shape: {
        square: "",
        circle: "rounded-full",
        ticket: "rounded-none [mask-image:radial-gradient(circle_at_0_50%,transparent_6px,#000_7px),radial-gradient(circle_at_100%_50%,transparent_6px,#000_7px)] [mask-composite:intersect]",
      },
    },
    defaultVariants: {
      variant: "yellow",
      size: "md",
      tilt: "left",
      shape: "square",
    },
  }
);

export interface StickerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof stickerVariants>,
    ThemeableProps {}

export const Sticker = React.forwardRef<HTMLSpanElement, StickerProps>(
  ({ className, variant, size, tilt, shape, children, theme, style, ...props }, ref) => {
    const isNumberOne =
      typeof children === "string" && children.trim().toLowerCase() === "#1";

    return (
      <span
        ref={ref}
        data-comixa-sticker=""
        data-comixa-sticker-variant={variant ?? "yellow"}
        data-comixa-theme={theme}
        className={cn(
          stickerVariants({ variant, size, tilt, shape }),
          className,
          isNumberOne && "text-white"
        )}
        style={mergeComixaThemeStyle(theme, style)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Sticker.displayName = "Sticker";
