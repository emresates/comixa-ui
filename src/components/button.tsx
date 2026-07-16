import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonVariants = cva(
  [
    "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
    "border-2 border-ink font-comic uppercase tracking-wide",
    "transition-[transform,box-shadow,filter] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    "[&>*]:relative [&>*]:z-10",
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
        retro:
          [
            "rounded-2xl border-[#5b3a1f] bg-[#d9913d] text-[#2b1d13]",
            "shadow-[3px_3px_0_0_#7a4d24] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#7a4d24]",
            "before:absolute before:inset-0 before:z-0 before:opacity-25",
            "before:bg-[radial-gradient(circle_at_1px_1px,#5b3a1f_1px,transparent_0)] before:bg-[length:9px_9px]",
            "after:absolute after:inset-0 after:z-0 after:bg-[#f3c66b]/25 after:mix-blend-multiply",
          ].join(" "),
        dark:
          [
            "border-[#62f5ff] bg-[#101114] text-[#e8fbff]",
            "shadow-[0_0_0_2px_#101114,0_0_16px_rgba(98,245,255,0.45)]",
            "hover:-translate-y-1 hover:shadow-[0_0_0_2px_#101114,0_0_26px_rgba(98,245,255,0.75)]",
            "active:translate-x-0 active:translate-y-0",
            "before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(120deg,transparent,rgba(98,245,255,0.28),transparent)]",
            "before:translate-x-[-110%] hover:before:translate-x-[110%] before:transition-transform before:duration-300",
          ].join(" "),
        "pop-art":
          [
            "border-ink bg-comic-red text-white shadow-[7px_7px_0_0_#FFE566]",
            "hover:-translate-y-1 hover:rotate-[-1deg] hover:shadow-[9px_9px_0_0_#4D9FFF]",
            "before:absolute before:inset-0 before:z-0 before:opacity-25",
            "before:bg-[radial-gradient(circle_at_2px_2px,#FFE566_2px,transparent_0)] before:bg-[length:12px_12px]",
            "after:absolute after:-right-3 after:-top-4 after:z-0 after:h-12 after:w-12 after:rotate-12 after:bg-comic-yellow after:[clip-path:polygon(50%_0,61%_33%,98%_35%,68%_55%,79%_91%,50%_70%,21%_91%,32%_55%,2%_35%,39%_33%)]",
          ].join(" "),
        manga:
          [
            "border-4 border-ink bg-white text-ink shadow-[7px_7px_0_0_#000]",
            "hover:-translate-y-1 hover:-skew-x-3 hover:shadow-[10px_10px_0_0_#000]",
            "active:translate-x-[3px] active:translate-y-[3px]",
            "before:absolute before:inset-0 before:z-0 before:opacity-[0.14]",
            "before:bg-[repeating-linear-gradient(-32deg,transparent_0,transparent_5px,#1A1A1A_5px,#1A1A1A_6px,transparent_6px,transparent_11px)]",
            "after:absolute after:inset-0 after:z-0 after:opacity-25",
            "after:bg-[repeating-linear-gradient(105deg,transparent_0,transparent_13px,#1A1A1A_14px,transparent_15px)]",
          ].join(" "),
        vintage:
          [
            "border border-[#24304f] bg-[#f4dfb8] font-serif font-black text-[#7f1d2d] shadow-[1.5px_1.5px_0_0_#5a3a24]",
            "tracking-[0.04em] hover:-translate-y-0.5 hover:bg-[#f7e7c8] hover:shadow-[2px_2px_0_0_#24304f]",
            "before:absolute before:inset-0 before:z-0 before:opacity-30",
            "before:bg-[radial-gradient(circle_at_1px_1px,#24304f_0.7px,transparent_0),repeating-linear-gradient(0deg,rgba(36,48,79,0.08)_0,rgba(36,48,79,0.08)_1px,transparent_1px,transparent_5px)] before:bg-[length:8px_8px,100%_6px]",
            "after:absolute after:inset-0 after:z-0 after:bg-[#7f1d2d]/[0.05]",
          ].join(" "),
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
