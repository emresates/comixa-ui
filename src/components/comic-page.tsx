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
  "grid w-full gap-2 border-4 border-ink bg-ink p-2 shadow-comic-lg",
  {
    variants: {
      tone: {
        default: "bg-ink",
        paper: "bg-paper-cream",
        yellow: "bg-comic-yellow",
      },
      rounded: {
        true: "rounded-xl",
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
    "relative min-h-[8rem] overflow-hidden border-2 border-ink bg-paper p-4 text-ink",
    "isolate transition-[transform,box-shadow,filter] duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-paper",
        cream: "bg-paper-cream",
        sky: "bg-comic-blue text-white",
        alert: "bg-comic-red text-white",
        pop: "bg-comic-yellow",
        night: "bg-ink text-paper",
        hero:
          "min-h-[22rem] border-4 bg-comic-yellow p-6 shadow-comic-lg before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.9)_0_0.45rem,transparent_0.5rem),radial-gradient(circle_at_82%_12%,rgba(255,77,77,0.72)_0_6rem,transparent_6.1rem),linear-gradient(135deg,rgba(77,159,255,0.95),rgba(255,229,102,0.9)_45%,rgba(255,122,182,0.85))] after:absolute after:inset-4 after:-z-10 after:border-2 after:border-ink/25 after:content-['']",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-comic-sm",
        md: "shadow-comic",
        lg: "shadow-comic-lg",
        xl: "shadow-[10px_10px_0_0_#1A1A1A]",
      },
      tilt: {
        true: "-rotate-1",
        false: "",
      },
      hover: {
        true: "hover:-translate-y-1 hover:rotate-0 hover:shadow-[12px_12px_0_0_#1A1A1A]",
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
          <p className="relative z-10 mb-2 inline-block border-2 border-ink bg-comic-yellow px-2 py-0.5 font-comic text-xs uppercase tracking-wide text-ink shadow-comic-sm">
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
