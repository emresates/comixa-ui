import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "border-2 border-ink font-comic uppercase tracking-wide",
    "transition-[transform,box-shadow] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  ].join(" "),
  {
    variants: {
      variant: {
        pop: "bg-comic-yellow text-ink shadow-comic hover:-translate-y-0.5",
        primary: "bg-comic-blue text-white shadow-comic hover:-translate-y-0.5",
        danger: "bg-comic-red text-white shadow-comic hover:-translate-y-0.5",
        success: "bg-comic-green text-ink shadow-comic hover:-translate-y-0.5",
        outline: "bg-paper text-ink shadow-comic-sm hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-ink shadow-none hover:bg-paper-cream active:translate-x-0 active:translate-y-0",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-sm",
        md: "h-10 rounded-lg px-4 text-base",
        lg: "h-12 rounded-xl px-6 text-lg",
      },
      effect: {
        none: "",
        pop: "animate-comic-pop",
        shake: "animate-comic-shake",
        wiggle: "animate-comic-wiggle",
      },
      icon: {
        true: "p-0 aspect-square shrink-0",
        false: "",
      },
    },
    compoundVariants: [
      { icon: true, size: "sm", class: "h-8 w-8 rounded-md" },
      { icon: true, size: "md", class: "h-10 w-10 rounded-lg" },
      { icon: true, size: "lg", class: "h-12 w-12 rounded-xl" },
    ],
    defaultVariants: {
      variant: "pop",
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
    VariantProps<typeof buttonVariants> {
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
        className={cn(
          buttonVariants({ variant, size, effect, icon }),
          className
        )}
        {...props}
      >
        {loading ? <Spinner className={spinnerSize} /> : null}
        {icon && loading ? null : children}
      </button>
    );
  }
);

Button.displayName = "Button";
