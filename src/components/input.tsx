import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const inputVariants = cva(
  [
    "flex w-full border-2 border-ink bg-paper font-body text-ink",
    "placeholder:text-ink-muted",
    "transition-[box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:shadow-comic focus-visible:-translate-y-0.5",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:font-comic file:text-sm",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "shadow-comic-sm",
        ghost: "border-dashed bg-transparent shadow-none",
        filled: "bg-paper-cream shadow-comic-sm",
      },
      inputSize: {
        sm: "h-8 rounded-md px-2.5 text-sm",
        md: "h-10 rounded-lg px-3 text-base",
        lg: "h-12 rounded-xl px-4 text-lg",
      },
      state: {
        default: "",
        error:
          "border-comic-red shadow-[4px_4px_0_0_#FF4D4D] focus-visible:shadow-[4px_4px_0_0_#FF4D4D]",
        success:
          "border-comic-green shadow-[4px_4px_0_0_#5BD67A] focus-visible:shadow-[4px_4px_0_0_#5BD67A]",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, inputSize, state, type = "text", ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, inputSize, state }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
