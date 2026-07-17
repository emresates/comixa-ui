import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";

export const buttonVariants = cva(
  [
    "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
    "uppercase",
    "[border-width:var(--comixa-button-border-width,2px)] [border-radius:var(--comixa-button-radius,0.5rem)] [font-family:var(--comixa-button-font,'Bangers','Comic_Sans_MS',cursive)] [font-weight:var(--comixa-button-font-weight,700)] [letter-spacing:var(--comixa-button-letter-spacing,0.025em)]",
    "[background:var(--comixa-button-bg)] [border-color:var(--comixa-button-border)] [box-shadow:var(--comixa-button-shadow-value)] [color:var(--comixa-button-text)]",
    "transition-[transform,box-shadow,filter] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:content-[''] before:[background-image:var(--comixa-button-pattern)] before:[background-size:var(--comixa-button-pattern-size)] before:opacity-[var(--comixa-button-pattern-opacity)]",
    "[&>*]:relative [&>*]:z-10",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[--comixa-button-bg:var(--comixa-default-bg,var(--comixa-warning-bg,#FFD84D))] [--comixa-button-text:var(--comixa-default-text,var(--comixa-warning-text,#111111))] [--comixa-button-border:var(--comixa-default-border,var(--comixa-warning-border,#1E1E1E))] [--comixa-button-shadow-value:var(--comixa-default-shadow-value,4px_4px_0_0_var(--comixa-default-shadow,var(--comixa-warning-shadow,#1E1E1E)))] [--comixa-button-pattern:var(--comixa-default-pattern,var(--comixa-warning-pattern,none))] [--comixa-button-pattern-size:var(--comixa-default-pattern-size,var(--comixa-warning-pattern-size,auto))] [--comixa-button-pattern-opacity:var(--comixa-default-pattern-opacity,var(--comixa-warning-pattern-opacity,0))] hover:-translate-y-0.5",
        warning:
          "[--comixa-button-bg:var(--comixa-warning-bg,#FFD84D)] [--comixa-button-text:var(--comixa-warning-text,#111111)] [--comixa-button-border:var(--comixa-warning-border,#1E1E1E)] [--comixa-button-shadow-value:var(--comixa-warning-shadow-value,4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E))] [--comixa-button-pattern:var(--comixa-warning-pattern,none)] [--comixa-button-pattern-size:var(--comixa-warning-pattern-size,auto)] [--comixa-button-pattern-opacity:var(--comixa-warning-pattern-opacity,0)] hover:-translate-y-0.5",
        primary:
          "[--comixa-button-bg:var(--comixa-primary-bg,#4F9CF9)] [--comixa-button-text:var(--comixa-primary-text,#FFFFFF)] [--comixa-button-border:var(--comixa-primary-border,#1E1E1E)] [--comixa-button-shadow-value:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))] [--comixa-button-pattern:var(--comixa-primary-pattern,none)] [--comixa-button-pattern-size:var(--comixa-primary-pattern-size,auto)] [--comixa-button-pattern-opacity:var(--comixa-primary-pattern-opacity,0)] hover:-translate-y-0.5",
        danger:
          "[--comixa-button-bg:var(--comixa-danger-bg,#FF5757)] [--comixa-button-text:var(--comixa-danger-text,#FFFFFF)] [--comixa-button-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-button-shadow-value:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-button-pattern:var(--comixa-danger-pattern,none)] [--comixa-button-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-button-pattern-opacity:var(--comixa-danger-pattern-opacity,0)] hover:-translate-y-0.5",
        success:
          "[--comixa-button-bg:var(--comixa-success-bg,#4ADE80)] [--comixa-button-text:var(--comixa-success-text,#111111)] [--comixa-button-border:var(--comixa-success-border,#1E1E1E)] [--comixa-button-shadow-value:var(--comixa-success-shadow-value,4px_4px_0_0_var(--comixa-success-shadow,#1E1E1E))] [--comixa-button-pattern:var(--comixa-success-pattern,none)] [--comixa-button-pattern-size:var(--comixa-success-pattern-size,auto)] [--comixa-button-pattern-opacity:var(--comixa-success-pattern-opacity,0)] hover:-translate-y-0.5",
        outline:
          "[--comixa-button-bg:var(--comixa-outline-bg,#FFFFFF)] [--comixa-button-text:var(--comixa-outline-text,#111111)] [--comixa-button-border:var(--comixa-outline-border,#1E1E1E)] [--comixa-button-shadow-value:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))] [--comixa-button-pattern:var(--comixa-outline-pattern,none)] [--comixa-button-pattern-size:var(--comixa-outline-pattern-size,auto)] [--comixa-button-pattern-opacity:var(--comixa-outline-pattern-opacity,0)] hover:-translate-y-0.5",
        ghost:
          "[--comixa-button-bg:var(--comixa-ghost-bg,transparent)] [--comixa-button-text:var(--comixa-ghost-text,#111111)] [--comixa-button-border:var(--comixa-ghost-border,transparent)] [--comixa-button-shadow-value:0_0_0_0_var(--comixa-ghost-shadow,transparent)] [--comixa-button-pattern:var(--comixa-ghost-pattern,none)] [--comixa-button-pattern-size:var(--comixa-ghost-pattern-size,auto)] [--comixa-button-pattern-opacity:var(--comixa-ghost-pattern-opacity,0)] hover:bg-paper-cream active:translate-x-0 active:translate-y-0",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
      effect: {
        none: "",
        pop: "hover:animate-comic-button-pop focus-visible:animate-comic-button-pop",
        shake:
          "hover:animate-comic-button-shake focus-visible:animate-comic-button-shake",
        wiggle: "hover:animate-comic-wiggle focus-visible:animate-comic-wiggle",
      },
      icon: {
        true: "p-0 aspect-square shrink-0",
        false: "",
      },
    },
    compoundVariants: [
      { icon: true, size: "sm", class: "h-8 w-8" },
      { icon: true, size: "md", class: "h-10 w-10" },
      { icon: true, size: "lg", class: "h-12 w-12" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      effect: "none",
      icon: false,
    },
  }
);

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3z"
      />
    </svg>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    ThemeableProps {
  /** Shows a spinner and disables the button */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      effect,
      icon = false,
      loading = false,
      disabled,
      type = "button",
      children,
      theme,
      style,
      ...props
    },
    ref
  ) => {
    const spinnerSize =
      size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        data-comixa-button-variant={variant ?? "default"}
        data-comixa-theme={theme}
        className={cn(
          buttonVariants({ variant, size, effect, icon }),
          className
        )}
        style={mergeComixaThemeStyle(theme, style)}
        {...props}
      >
        {loading ? <Spinner className={spinnerSize} /> : null}
        {icon && loading ? null : children}
      </button>
    );
  }
);

Button.displayName = "Button";
