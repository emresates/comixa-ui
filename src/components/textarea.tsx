import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const textareaVariants = cva(
  [
    "flex w-full border-2 border-ink bg-paper font-body text-ink",
    "placeholder:text-ink-muted",
    "transition-[box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:shadow-comic focus-visible:-translate-y-0.5",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "shadow-comic-sm",
        ghost: "border-dashed bg-transparent shadow-none",
        filled: "bg-paper-cream shadow-comic-sm",
      },
      textareaSize: {
        sm: "min-h-20 rounded-md px-2.5 py-2 text-sm",
        md: "min-h-28 rounded-lg px-3 py-2.5 text-base",
        lg: "min-h-36 rounded-xl px-4 py-3 text-lg",
      },
      state: {
        default: "",
        error:
          "border-comic-red shadow-[4px_4px_0_0_#FF4D4D] focus-visible:shadow-[4px_4px_0_0_#FF4D4D]",
        success:
          "border-comic-green shadow-[4px_4px_0_0_#5BD67A] focus-visible:shadow-[4px_4px_0_0_#5BD67A]",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
      state: "default",
      resize: "vertical",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant, textareaSize, state, resize, ...props },
    ref
  ) => (
    <textarea
      ref={ref}
      className={cn(
        textareaVariants({ variant, textareaSize, state, resize }),
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
