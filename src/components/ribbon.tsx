import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const ribbonVariants = cva(
  "inline-flex select-none items-center justify-center border-2 border-ink font-comic uppercase tracking-wide text-ink shadow-comic-sm",
  {
    variants: {
      variant: {
        banner: "bg-comic-yellow px-4 py-1.5",
        corner:
          "bg-comic-red px-5 py-1.5 text-white [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]",
        ticket:
          "bg-paper-cream px-4 py-1.5 [mask-image:radial-gradient(circle_at_0_50%,transparent_6px,#000_7px),radial-gradient(circle_at_100%_50%,transparent_6px,#000_7px)] [mask-composite:intersect]",
        burst:
          "bg-comic-pink px-5 py-2 [clip-path:polygon(50%_0,60%_28%,92%_18%,72%_48%,100%_62%,66%_66%,72%_100%,50%_76%,28%_100%,34%_66%,0_62%,28%_48%,8%_18%,40%_28%)]",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
      },
      tilt: {
        none: "rotate-0",
        left: "-rotate-2",
        right: "rotate-2",
      },
    },
    defaultVariants: {
      variant: "banner",
      size: "md",
      tilt: "none",
    },
  }
);

export interface RibbonProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ribbonVariants> {}

export const Ribbon = React.forwardRef<HTMLSpanElement, RibbonProps>(
  ({ className, variant, size, tilt, ...props }, ref) => (
    <span
      ref={ref}
      data-comixa-ribbon=""
      className={cn(ribbonVariants({ variant, size, tilt }), className)}
      {...props}
    />
  )
);
Ribbon.displayName = "Ribbon";
