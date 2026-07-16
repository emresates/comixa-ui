import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const timelineVariants = cva("relative flex w-full flex-col", {
  variants: {
    variant: {
      default: "gap-8",
      compact: "gap-5",
      roomy: "gap-10",
    },
    line: {
      dashed: "[&_[data-timeline-line]]:border-dashed",
      solid: "[&_[data-timeline-line]]:border-solid",
      none: "[&_[data-timeline-line]]:hidden",
    },
  },
  defaultVariants: {
    variant: "default",
    line: "dashed",
  },
});

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, variant, line, children, ...props }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ variant, line }), className)}
        data-line={line}
        {...props}
      >
        {items.map((child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                "data-comixa-timeline-last": index === items.length - 1,
              } as React.HTMLAttributes<HTMLElement>)
            : child
        )}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

export const timelineItemVariants = cva(
  [
    "relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4",
    "sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5",
  ].join(" "),
  {
    variants: {
      color: {
        red: "[--timeline-dot:#ef4444]",
        yellow: "[--timeline-dot:#ffd84d]",
        blue: "[--timeline-dot:#54c8d4]",
        orange: "[--timeline-dot:#ff9b54]",
        pink: "[--timeline-dot:#ff6fae]",
        green: "[--timeline-dot:#57d68d]",
      },
      tilt: {
        none: "",
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      color: "yellow",
      tilt: "none",
    },
  }
);

export interface TimelineItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "color">,
    VariantProps<typeof timelineItemVariants> {
  period: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  "data-comixa-timeline-last"?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLElement, TimelineItemProps>(
  (
    {
      className,
      color,
      tilt,
      period,
      title,
      description,
      children,
      "data-comixa-timeline-last": isLast,
      ...props
    },
    ref
  ) => (
    <article
      ref={ref}
      className={cn(timelineItemVariants({ color, tilt }), className)}
      {...props}
    >
      <div className="relative flex justify-center">
        {!isLast ? (
          <span
            className="absolute left-1/2 top-10 h-[calc(100%+2rem-2rem)] -translate-x-1/2 border-l-4 border-ink"
            data-timeline-line
            aria-hidden="true"
          />
        ) : null}
        <span
          className="relative z-10 mt-2 h-8 w-8 rounded-full border-4 border-ink bg-[var(--timeline-dot)] shadow-comic-sm"
          aria-hidden="true"
        />
      </div>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border-4 border-ink bg-paper p-5 shadow-comic transition-transform duration-200",
          "hover:-translate-y-1",
          tilt === "left" && "-rotate-1",
          tilt === "right" && "rotate-1"
        )}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)",
            backgroundSize: "12px 12px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col gap-3">
          <span className="w-fit rounded-full border-2 border-ink bg-ink px-4 py-1 font-comic text-sm uppercase leading-none text-comic-yellow shadow-comic-sm">
            {period}
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="font-comic text-2xl uppercase leading-none text-comic-red sm:text-3xl">
              {title}
            </h3>
            {description ? (
              <p className="font-body text-sm leading-relaxed text-ink sm:text-base">
                {description}
              </p>
            ) : null}
            {children ? <div className="pt-1">{children}</div> : null}
          </div>
        </div>
      </div>
    </article>
  )
);
TimelineItem.displayName = "TimelineItem";
