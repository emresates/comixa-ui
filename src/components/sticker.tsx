import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const stickerVariants = cva(
  [
    "inline-flex select-none items-center justify-center border-2 border-ink",
    "font-comic uppercase tracking-wide text-ink shadow-comic",
    "transition-transform duration-150 hover:-rotate-3 hover:scale-105",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-paper",
        yellow: "bg-comic-yellow",
        red: "bg-comic-red text-white",
        blue: "bg-comic-blue text-white",
        green: "bg-comic-green",
        pink: "bg-comic-pink",
        orange: "bg-comic-orange",
        ink: "bg-ink text-paper",
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
    VariantProps<typeof stickerVariants> {}

export const Sticker = React.forwardRef<HTMLSpanElement, StickerProps>(
  ({ className, variant, size, tilt, shape, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          stickerVariants({ variant, size, tilt, shape }),
          className
        )}
        {...props}
      />
    );
  }
);
Sticker.displayName = "Sticker";
