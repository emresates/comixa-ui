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
    },
    defaultVariants: {
      variant: "pop",
      size: "md",
      effect: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, effect, type = "button", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, effect }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
