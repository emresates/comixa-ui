import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const featuresVariants = cva("grid w-full gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export interface FeaturesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuresVariants> {}

export const Features = React.forwardRef<HTMLDivElement, FeaturesProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(featuresVariants({ columns }), className)}
      {...props}
    />
  )
);
Features.displayName = "Features";

export const featureVariants = cva(
  [
    "relative flex h-full flex-col gap-3 overflow-hidden border-2 border-ink p-5",
    "font-body text-ink shadow-comic transition-transform duration-150 hover:-translate-y-1",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "rounded-xl bg-paper",
        yellow: "rounded-xl bg-comic-yellow",
        blue: "rounded-xl bg-comic-blue text-white",
        burst:
          "rounded-xl bg-comic-pink before:absolute before:-right-8 before:-top-8 before:h-24 before:w-24 before:rounded-full before:border-2 before:border-ink before:bg-comic-yellow/80",
        outline: "rounded-xl border-dashed bg-transparent shadow-none",
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
      },
    },
    defaultVariants: {
      variant: "default",
      align: "left",
    },
  }
);

export interface FeatureProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof featureVariants> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const Feature = React.forwardRef<HTMLElement, FeatureProps>(
  (
    { className, variant, align, icon, title, description, children, ...props },
    ref
  ) => (
    <article
      ref={ref}
      className={cn(featureVariants({ variant, align }), className)}
      {...props}
    >
      {icon ? (
        <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-ink bg-paper text-ink shadow-comic-sm">
          {icon}
        </div>
      ) : null}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-comic text-2xl uppercase leading-none tracking-wide">
          {title}
        </h3>
        {description ? (
          <p className={cn("text-sm leading-relaxed", variant === "blue" ? "text-white/80" : "text-ink-muted")}>
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="relative z-10 mt-auto">{children}</div> : null}
    </article>
  )
);
Feature.displayName = "Feature";
