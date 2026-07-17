import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const ribbonVariants = cva(
  [
    "inline-flex select-none items-center justify-center border-2 font-comic text-ink",
    "[border-color:var(--comixa-ribbon-border,#1A1A1A)]",
    "[border-radius:var(--comixa-ribbon-radius,0.375rem)]",
    "[box-shadow:var(--comixa-ribbon-shadow,3px_3px_0_#1A1A1A)]",
    "[font-family:var(--comixa-ribbon-font,var(--comixa-button-font,'Bangers','Comic_Sans_MS',cursive))]",
    "[letter-spacing:var(--comixa-ribbon-letter-spacing,0.025em)]",
    "[text-transform:var(--comixa-ribbon-text-transform,uppercase)]",
  ].join(" "),
  {
    variants: {
      variant: {
        banner:
          "px-4 py-1.5 [background:var(--comixa-ribbon-banner-bg,#FFD84D)] [color:var(--comixa-ribbon-banner-text,#111111)]",
        corner:
          "px-5 py-1.5 [background:var(--comixa-ribbon-corner-bg,#FF5757)] [color:var(--comixa-ribbon-corner-text,#FFFFFF)] [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]",
        ticket:
          "px-4 py-1.5 [background:var(--comixa-ribbon-ticket-bg,#FFF3D6)] [color:var(--comixa-ribbon-ticket-text,#111111)] [mask-image:radial-gradient(circle_at_0_50%,transparent_6px,#000_7px),radial-gradient(circle_at_100%_50%,transparent_6px,#000_7px)] [mask-composite:intersect]",
        burst:
          "px-5 py-2 [background:var(--comixa-ribbon-burst-bg,#FF7AB6)] [color:var(--comixa-ribbon-burst-text,#111111)] [clip-path:polygon(50%_0,60%_28%,92%_18%,72%_48%,100%_62%,66%_66%,72%_100%,50%_76%,28%_100%,34%_66%,0_62%,28%_48%,8%_18%,40%_28%)]",
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
      data-comixa-ribbon-variant={variant ?? "banner"}
      className={cn(ribbonVariants({ variant, size, tilt }), className)}
      {...props}
    />
  )
);
Ribbon.displayName = "Ribbon";
