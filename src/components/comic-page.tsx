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
    "shadow-none",
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
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ComicPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comicPanelVariants> {
  caption?: React.ReactNode;
}

export const ComicPanel = React.forwardRef<HTMLDivElement, ComicPanelProps>(
  ({ className, variant, caption, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(comicPanelVariants({ variant }), className)}
        {...props}
      >
        {caption ? (
          <p className="mb-2 inline-block border-2 border-ink bg-comic-yellow px-2 py-0.5 font-comic text-xs uppercase tracking-wide text-ink shadow-comic-sm">
            {caption}
          </p>
        ) : null}
        <div className="font-body text-base leading-relaxed">{children}</div>
      </div>
    );
  }
);
ComicPanel.displayName = "ComicPanel";
