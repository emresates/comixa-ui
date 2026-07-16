import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type ComicPageLayout =
  | "1"
  | "1-1"
  | "2"
  | "2-1"
  | "1-2"
  | "2-2"
  | "3"
  | "1-1-1";

const layoutClass: Record<ComicPageLayout, string> = {
  "1": "grid-cols-1",
  "1-1": "grid-cols-1 sm:grid-cols-2",
  "2": "grid-cols-2",
  "2-1": "grid-cols-2 [&>*:last-child]:col-span-2",
  "1-2": "grid-cols-2 [&>*:first-child]:col-span-2",
  "2-2": "grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-3",
  "1-1-1": "grid-cols-1",
};

export const comicPageVariants = cva(
  [
    "grid w-full gap-2 p-2",
    "[border-width:var(--comixa-comic-page-border-width,4px)] [border-color:var(--comixa-outline-border,#1E1E1E)]",
    "[box-shadow:var(--comixa-outline-shadow-value,6px_6px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
  ].join(" "),
  {
    variants: {
      tone: {
        default: "[background:var(--comixa-comic-page-bg,var(--comixa-outline-border,#1E1E1E))]",
        paper: "[background:var(--comixa-default-bg,#FFF3D6)]",
        yellow: "[background:var(--comixa-warning-bg,#FFD84D)]",
      },
      rounded: {
        true: "[border-radius:var(--comixa-button-radius,0.75rem)]",
        false: "rounded-none",
      },
    },
    defaultVariants: {
      tone: "default",
      rounded: true,
    },
  }
);

export interface ComicPageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comicPageVariants> {
  /**
   * Panel grid pattern.
   * `2-1` = 2 panels on top, 1 full-width below (classic comic page beat).
   */
  layout?: ComicPageLayout;
}

export const ComicPage = React.forwardRef<HTMLDivElement, ComicPageProps>(
  (
    { className, layout = "2-1", tone, rounded, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          comicPageVariants({ tone, rounded }),
          layoutClass[layout],
          className
        )}
        data-layout={layout}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ComicPage.displayName = "ComicPage";

export const comicPanelVariants = cva(
  [
    "relative min-h-[8rem] overflow-hidden p-4",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:calc(var(--comixa-button-radius,0.75rem)_*_0.75)]",
    "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [font-family:var(--comixa-button-font,inherit)]",
    "isolate transition-[transform,box-shadow,filter] duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)]",
        cream:
          "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)] [border-color:var(--comixa-default-border,#1E1E1E)]",
        sky:
          "[background:var(--comixa-primary-bg,#4F9CF9)] [color:var(--comixa-primary-text,#FFFFFF)] [border-color:var(--comixa-primary-border,#1E1E1E)]",
        alert:
          "[background:var(--comixa-danger-bg,#FF5757)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)]",
        pop:
          "[background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)]",
        night:
          "[background:var(--pg-surface-dark,#1A1A1A)] [color:var(--pg-surface-light,#FFF3D6)] [border-color:var(--comixa-outline-border,#1E1E1E)]",
        hero:
          "min-h-[22rem] [border-width:calc(var(--comixa-button-border-width,2px)_*_2)] [background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)] p-5 [box-shadow:var(--comixa-warning-shadow-value,6px_6px_0_0_var(--comixa-warning-shadow,#1E1E1E))] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_82%_18%,rgba(255,77,77,0.52)_0_4.8rem,transparent_4.9rem),radial-gradient(circle_at_18%_28%,rgba(77,159,255,0.58)_0_8rem,transparent_8.2rem),linear-gradient(135deg,rgba(255,253,245,0.58)_0%,rgba(255,229,102,0.42)_42%,rgba(255,122,182,0.32)_100%)] md:p-7",
      },
      shadow: {
        none: "shadow-none",
        sm: "[box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        md: "[box-shadow:var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        lg: "[box-shadow:var(--comixa-outline-shadow-value,6px_6px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        xl: "[box-shadow:var(--comixa-comic-panel-xl-shadow,10px_10px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
      },
      tilt: {
        true: "-rotate-1",
        false: "",
      },
      hover: {
        true:
          "hover:-translate-y-1 hover:rotate-0 hover:[box-shadow:var(--comixa-comic-panel-hover-shadow,12px_12px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        false: "",
      },
      halftone: {
        true:
          "after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-[radial-gradient(circle,rgba(26,26,26,0.18)_0_1px,transparent_1.3px)] after:bg-[length:10px_10px] after:mix-blend-multiply after:content-['']",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      shadow: "none",
      tilt: false,
      hover: false,
      halftone: false,
    },
  }
);

export interface ComicPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comicPanelVariants> {
  caption?: React.ReactNode;
}

export const ComicPanel = React.forwardRef<HTMLDivElement, ComicPanelProps>(
  (
    {
      className,
      variant,
      shadow,
      tilt,
      hover,
      halftone,
      caption,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          comicPanelVariants({ variant, shadow, tilt, hover, halftone }),
          className
        )}
        {...props}
      >
        {caption ? (
          <p className="relative z-10 mb-2 inline-block px-2 py-0.5 font-comic text-xs uppercase tracking-wide [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-warning-border,#1E1E1E)] [background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [box-shadow:var(--comixa-warning-shadow-value,2px_2px_0_0_var(--comixa-warning-shadow,#1E1E1E))]">
            {caption}
          </p>
        ) : null}
        <div className="relative z-10 font-body text-base leading-relaxed">
          {children}
        </div>
      </div>
    );
  }
);
ComicPanel.displayName = "ComicPanel";
