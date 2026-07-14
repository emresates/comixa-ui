import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const badgeVariants = cva(
  [
    "inline-flex items-center border-2 border-ink font-comic uppercase tracking-wide",
    "shadow-comic-sm",
  ].join(" "),
  {
    variants: {
      variant: {
        yellow: "bg-comic-yellow text-ink",
        red: "bg-comic-red text-white",
        blue: "bg-comic-blue text-white",
        green: "bg-comic-green text-ink",
        pink: "bg-comic-pink text-ink",
        outline: "bg-paper text-ink",
      },
      size: {
        sm: "rounded-md px-2 py-0.5 text-xs",
        md: "rounded-lg px-2.5 py-1 text-sm",
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
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
